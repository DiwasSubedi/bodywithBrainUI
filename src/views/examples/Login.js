/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Auth } from 'aws-amplify';
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  UncontrolledAlert
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
            email: '',
            password: '',
            serverError: false,
            serverMessage:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleServerError = this.toggleServerError.bind(this);
       
        this.isValid = this.isValid.bind(this)

  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;        
    const inputValue = target.value;

    this.setState({
        [inputName] : inputValue
    });        
}


handleSubmit(event) {
  event.preventDefault();   
  const loginRequest = Object.assign({}, this.state);
  Auth.signIn({
    username: loginRequest.email,
    password: loginRequest.password
  })
  .then((response) => {console.log('successfully signed in',response); this.props.history.push("/admin/index")})
  .catch((err) =>{
    console.log(`Error signing in: `,err)
    this.setState({
      serverError:true,
      serverMessage: err.message
    }); 
  } )
}
isValid(){
  if( this.state.password && this.state.email ){
      return true;
  } 
  return false;
}
toggleServerError(){
  debugger;
  if(this.state.serverError){
    this.setState({
      serverError:false
    });
    return; 
  }
  this.setState({
    serverError:true,
  }); 
}


  componentDidMount() {
  }

  render() {
   /* if(this.props.authenticated) {
      return <Redirect
          to={{
            pathname: "/admin/index",
            state: { from: this.props.location }
          }}/>;
    }*/
    let GITHUB_AUTH_URL = '';
    let GOOGLE_AUTH_URL = '';
    let FACEBOOK_AUTH_URL = '';

    return (
      <>
        <Col lg="6" md="8">
          <Card className=" shadow border-0" style={{ backgroundColor: '#e7fbfe', borderColor: '#FFFFF' }}>
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href={GITHUB_AUTH_URL}

                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href={GOOGLE_AUTH_URL}

                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>

                <Button
                    className="btn-neutral btn-icon mr-4"
                    color="default"
                    href={FACEBOOK_AUTH_URL}
                >
                  <span className="btn-inner--icon">
                    <img
                        alt="..."
                        src={require("assets/img/icons/common/facebook.png")}
                    />
                  </span>
                  <span className="btn-inner--text">Facebook</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <UncontrolledAlert color="warning" fade={true} isOpen={this.state.serverError} toggle={this.toggleServerError} >
                <span className="alert-inner--text">
                  <strong>Error!</strong> {this.state.serverMessage}
                </span>
              </UncontrolledAlert>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" name="email" value={this.state.email} onChange={this.handleInputChange} autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password"  name="password" value={this.state.password} onChange={this.handleInputChange} autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
               
                <div className="text-center">
                {this.isValid() &&
                  <Button className="mt-4" onClick={this.handleSubmit} color="primary" type="button">
                    Sign In
                  </Button>}
                  {!this.isValid() &&
                  <Button className="mt-4" onClick={this.handleSubmit} color="secondary" type="button" disabled>
                    Sign In
                  </Button>}
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;