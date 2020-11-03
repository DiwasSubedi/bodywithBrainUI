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
import React, { isValidElement } from "react";

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
  FormFeedback
} from "reactstrap";
import { Auth } from 'aws-amplify';
import { UncontrolledAlert } from "reactstrap";
class Register extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      gitHubRedirect: false,
      facebookRedirect: false,
      name: '',
      email: '',
      password: '',
      passwordMatch: '',
      serverError: false,
      validName: true,
      validEmail:true,
      validPassword:true,
      validPasswordMatch:true,
      serverMessage:''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleServerError = this.toggleServerError.bind(this);
    this.hadleValidation = this.hadleValidation.bind(this);
    this.isValid = this.isValid.bind(this)
  }

  handleInputChange(event) {
    debugger;
    const target = event.target;
    const inputName = target.name;        
    const inputValue = target.value;

    this.setState({
        [inputName] : inputValue
    });        
    if(inputName == 'password' && this.state.passwordMatch){
      if(this.state.passwordMatch != inputValue){
        this.setState({
          validPasswordMatch:false
        })
      }
    }
}
  handleSubmit(event) {
    debugger;
    
      event.preventDefault();
      const signUpRequest = Object.assign({}, this.state);
      console.log(signUpRequest.email);

      Auth.signUp({
        username: signUpRequest.email,
        password: signUpRequest.password,
        attributes: {
            email: signUpRequest.email,
            'custom:fullname': signUpRequest.name
        }
      })
      .then(response => {
            //Alert.success("You're successfully registered. Please login to continue!");
            console.log("Success",response)
            this.props.history.push("/auth/login");
        }).catch(error => {
          console.log(error);
          this.setState({
            serverError:true,
            serverMessage: error.message
          }); 
            //Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
      });
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
  hadleValidation(event){
    debugger;
    const target = event.target;
    const inputName = target.name;        
    const inputValue = target.value;

      if(inputName == 'name'){
        if(!inputValue.length>0){
          this.setState({
            validName:false
          })
        }else{
        
            this.setState({
              validName:true
            })
        }
      }
      if(inputName == 'email'){
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(!pattern.test(inputValue)){
          this.setState({
            validEmail:false
          })
        }else{
            this.setState({
              validEmail:true
            })
        }
      }
      if(inputName == 'password'){
        let pattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        if(!pattern.test(inputValue)){
          this.setState({
            validPassword:false
          })
        }else{
            this.setState({
              validPassword:true
            })
        }
      }
      if(inputName == 'passwordMatch'){
       
        if(this.state.password != this.state.passwordMatch){
          this.setState({
            validPasswordMatch:false
          })
        }else{
            this.setState({
              validPasswordMatch:true
            })
        }
      }
      
  }
  isValid(){
    if(this.state.name && this.state.password && this.state.email && this.state.passwordMatch){
      if(this.state.validEmail && this.state.validName && this.state.validPassword && this.state.validPasswordMatch){
        return true;
      }
    } 
    return false;
  }

  render() {
    let GITHUB_AUTH_URL = '';
    let GOOGLE_AUTH_URL = '';
    let FACEBOOK_AUTH_URL = '';
    

    return (
      <>
  <Col lg="6" md="8">
          <Card className="shadow border-0" style={{ backgroundColor: ' rgb(37 50 120)', borderColor: '#FFFFF' }} >
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
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
                <small>Or sign up with credentials</small>
              </div>
              <UncontrolledAlert color="warning" fade={true} isOpen={this.state.serverError} toggle={this.toggleServerError} >
              
                <span className="alert-inner--text">
                  <strong>Error!</strong> {this.state.serverMessage}
                </span>
              </UncontrolledAlert>
              <Form role="form">
                <FormGroup>  
                    <Input  placeholder="Name*" name="name" value={this.state.name} onChange={this.handleInputChange} onBlur={this.hadleValidation} type="text" required invalid={!this.state.validName}/>
                    <FormFeedback invalid>Name is required.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Email*" name="email" value={this.state.email} onChange={this.handleInputChange} onBlur={this.hadleValidation} type="email"  required invalid={!this.state.validEmail}/>
                    <FormFeedback invalid>Valid Email is required.</FormFeedback>
                </FormGroup>
                <FormGroup>
                
                    <Input placeholder="Password"  name="password" value={this.state.password} onChange={this.handleInputChange} onBlur={this.hadleValidation} type="password"  invalid={!this.state.validPassword}/>
                    <FormFeedback invalid>Valid Password must be atleast 8 Characters,</FormFeedback>
                    <FormFeedback invalid>Require numbers</FormFeedback>
                    <FormFeedback invalid>Require special character</FormFeedback>
                    <FormFeedback invalid>Require uppercase letters</FormFeedback>
                    <FormFeedback invalid>Require lowercase letters</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Re type Password"  name="passwordMatch" value={this.state.passwordMatch} onBlur={this.hadleValidation} onChange={this.handleInputChange} type="password"  invalid={!this.state.validPasswordMatch} required/>
                    <FormFeedback invalid>Are you drunk ? Remember what you just wrote.</FormFeedback>
                </FormGroup>
                <div className="text-center">
                  {this.isValid() &&
                  <Button className="mt-4" onClick={this.handleSubmit} color="primary" type="button">
                    Create account
                  </Button>}
                  {!this.isValid() &&
                  <Button className="mt-4" onClick={this.handleSubmit} color="secondary" type="button" disabled>
                    Create account
                  </Button>}
                </div>
              </Form>
             
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
