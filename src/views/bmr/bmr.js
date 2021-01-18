import React, { Component } from 'react';
import {
	Alert,
	Button,
	Row,
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	Col,
	Container,
	FormGroup,
	FormFeedback,
	FormText,
	Input,
	Label,
} from 'reactstrap';
import Header from 'components/Headers/Header.js';
import Form from 'reactstrap/es/Form';
import Joi from 'joi-browser';
import { ErrorSection } from 'aws-amplify-react';
class Bmr extends Component {
	state = {
		user: { age: '', height: '', weight: '', gender: '' },
		unit: { US: true, metric: false },
		result: { bmr: '' },
		errors: {},
	};
	schema = {
		age: Joi.number().min(0).required().label('Age'),
		gender: Joi.string().required().label('Gender'),
		height: Joi.number().min(0).required().label('Height'),
		height_ft: Joi.number().min(0).required().label('Height in feet'),
		height_in: Joi.number().min(0).max(12).required().label('Height in inches'),
		weight: Joi.number().min(0).required().label('Weight'),
		weight_pd: Joi.number().min(0).required().label('Weight'),
	};
	validate = () => {
		const options = { abortEarly: false };

		const { error } = Joi.validate(this.state.user, this.schema, options);

		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);

		return error ? error.details[0].message : null;
	};

	calculateBMR = () => {
		const { gender, weight, height, age } = this.state.user;

		var bmr;
		if (gender === 'M') {
			bmr = 10 * weight + 6.25 * height - 5 * age + 5;
		} else if (gender === 'F') {
			bmr = 10 * weight + 6.25 * height - 5 * age - 161;
		}
		return bmr;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { result } = this.state;
		const errors = this.validate();

		this.setState({ errors: errors || {} });
		if (errors) return;

		result.bmr = this.calculateBMR();
		this.setState({ result });
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const user = { ...this.state.user };
		user[input.name] = input.value;

		if (user.height_ft || user.height_in) {
			// converting the ft-in height to cm
			user.height = user.height_ft * 30.48 + user.height_in * 2.54;
		}
		if (user.weight_pd) {
			user.weight = user.weight_pd / 2.205;
		}

		this.setState({ user, errors });
	};

	handleUnitChange = (param) => {
		this.handleClear();
		const { unit, user } = this.state;

		if (param === 'US') {
			unit.US = true;
			unit.metric = false;
		} else {
			unit.US = false;
			unit.metric = true;
			user.height_ft = 0;
			user.height_in = 0;
			user.weight_pd = 0;
		}

		this.setState({ unit, user });
	};
	handleClear = () => {
		const user = { age: '', height: '', weight: '', gender: '', height_ft: '', height_in: '', weight_pd: '' };
		const result = { bmr: '' };
		this.setState({ user, result });
	};
	render() {
		const { user, unit, errors, result } = this.state;
		return (
			<>
				<Header />
				<Container className='themed-container' fluid='sm'>
					<Row>
						<Button color='primary' active onClick={() => this.handleUnitChange('US')}>
							US Units
						</Button>{' '}
						<Button color='primary' active onClick={() => this.handleUnitChange('Metric')}>
							Metric Units
						</Button>{' '}
					</Row>
					<Row>
						<Col sm={8}>
							<Form>
								<Row form>
									<Col sm={8}>
										<FormGroup>
											<Label htmlFor='age'>Age</Label>
											<Input
												id='age'
												name='age'
												value={user.age}
												onChange={this.handleChange}
												type='number'
											/>
											{errors.age && <Alert color='warning'>{errors.age}</Alert>}
										</FormGroup>
										<FormGroup tag='fieldset'>
											<Label htmlFor='gender'>Gender</Label>{' '}
											<FormGroup check inline>
												<Label check>
													<Input
														type='radio'
														value='M'
														name='gender'
														checked={user.gender === 'M'}
														onChange={this.handleChange}
													/>{' '}
													Male
												</Label>
											</FormGroup>
											<FormGroup check inline>
												<Label check>
													<Input
														type='radio'
														value='F'
														name='gender'
														checked={user.gender === 'F'}
														onChange={this.handleChange}
													/>{' '}
													Female
												</Label>
											</FormGroup>{' '}
											{errors.gender && <Alert color='warning'>{errors.gender}</Alert>}
										</FormGroup>
									</Col>
								</Row>
								{unit.US && (
									<>
										<Row form>
											<Col md={6}>
												<FormGroup inline>
													<Label htmlFor='Height'>Height</Label>

													<Input
														id='Height'
														name='height_ft'
														value={user.height_ft}
														onChange={this.handleChange}
														type='number'
														placeHolder='feet'
													/>
													{errors.height_ft && (
														<Alert color='warning'>{errors.height_ft}</Alert>
													)}
												</FormGroup>

												<FormGroup inline>
													<Input
														id='Height'
														name='height_in'
														value={user.height_in}
														onChange={this.handleChange}
														type='number'
														placeHolder='inches'
													/>
													{errors.height_in && (
														<Alert color='warning'>{errors.height_in}</Alert>
													)}
												</FormGroup>

												<FormGroup inline>
													<Label htmlFor='weight'>Weight</Label>

													<Input
														id='weight'
														name='weight_pd'
														value={user.weight_pd}
														onChange={this.handleChange}
														type='number'
														placeHolder='pounds'
													/>
													{errors.weight_pd && (
														<Alert color='warning'>{errors.weight_pd}</Alert>
													)}
												</FormGroup>
											</Col>
										</Row>
									</>
								)}
								{unit.metric && (
									<>
										<Row form>
											<Col md={6}>
												<FormGroup inline>
													<Label htmlFor='Height'>Height</Label>

													<Input
														id='Height'
														name='height'
														value={user.height}
														onChange={this.handleChange}
														type='number'
														placeHolder='cm'
													/>
													{errors.height && <Alert color='warning'>{errors.height}</Alert>}
												</FormGroup>

												<FormGroup inline>
													<Label htmlFor='weight'>Weight</Label>

													<Input
														id='weight'
														name='weight'
														value={user.weight}
														onChange={this.handleChange}
														type='number'
														placeHolder='kg'
													/>
													{errors.weight && <Alert color='warning'>{errors.weight}</Alert>}
												</FormGroup>
											</Col>
										</Row>
									</>
								)}
								<Button onClick={this.handleClear}>Clear</Button>
								<Button color='primary' onClick={this.handleSubmit}>
									Submit
								</Button>
							</Form>
						</Col>
						<Col sm={4}>
							{result.bmr && (
								<Card>
									<CardBody>
										<CardTitle tag='h5'>Your BMR is</CardTitle>
										<CardSubtitle tag='h6' className='mb-2 text-muted'>
											BMR = {result.bmr} Calories/Day
										</CardSubtitle>
									</CardBody>
								</Card>
							)}
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default Bmr;