import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import allblogs from "../../jsondata/blog.json";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  CardImg,
  CardTitle,
  CardText,
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import BlogCard from "./BlogCards";
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Amplify, {Auth, Storage } from 'aws-amplify';
import LoadingIndicator from "common/LoadingIndicator";
import { Redirect } from "react-router-dom";

class CreateBlog extends React.Component {
  state = {};
constructor(props){
  super(props);
  this.state = {
    title: '',
    catogeries: [],
    post:"",
    serverError: false,
    serverMessage:'',
    value:"Example please use this to write blog",
    myInp:null,
    loading:true,
    user:undefined
}; 
this.quill = React.createRef(); 
this.imageHandler = this.imageHandler.bind(this);
this.setValue = this.setValue.bind(this);

}

setValue(val){
  this.setState({
    value:val
  })
  console.log(val)
}

async componentDidMount(){
  debugger;
  await Auth.currentAuthenticatedUser().then((user) => {  
    this.setState({
      loading:false,
      user: user
    });
    console.debug("USerInfo", user);
  })
  .catch((exp) => {
    console.log("Caught",exp);
    this.setState({
      loading:false
    });
    this.props.history.push("/auth/login") 
  });
 
}

imageHandler(state){
  debugger;
  let currentUser = this.state.user.attributes.email.substring(0, this.state.user.attributes.email.indexOf('@'));
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  let randomNumber = Math.floor(Math.random()*10000000000000000) + 1
  input.onchange = async function() {
    const file = input.files[0];
    console.log('User trying to uplaod this:', file);
    Storage.put(currentUser+"/"+randomNumber+".jpg", file)
    .then (result => {
      console.log(result)
      const range = this.quill.current.editor.getSelection();
      this.quill.current.editor.insertEmbed(range.index, 'image', "https://bodywithbrain-blog-images.s3-us-west-2.amazonaws.com/public/"+result.key);
    })
    .catch(err => console.log(err));
 }.bind(this); // react thing
}


modules = {
  toolbar: {
    container: [
      [{ header: [3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code"],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ],
    handlers: {
      image: this.imageHandler.bind(this)
    }
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};


formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];


 
 
  render() {
  if(!this.state.loading && !this.state.user){
    debugger;
    return (<Redirect to={{
      pathname: "/auth/register",
      state: { from: this.props.location }
    }}/>);
  }
    return (
      <>
      
      <Header />
        {/* Page content */}
       <Container className=" mt--7 bg-gradient-info" fluid>
          {/* Table */}
          <Row ><Col><h3>&nbsp;&nbsp;NEW BLOG</h3></Col></Row>
          
          <Row><div className="col-2"></div><div  className="col-9"><Form>
                    <h6 className="heading-small text-muted mb-4">
                      Blog Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-blogname"
                            >
                              Title
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="Title"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Catagories
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Food,Workout"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      
                       
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Write Blog
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col className="mb-8">
                          <ReactQuill ref = {this.quill} className="bg-white" theme={"snow"}  modules={this.modules} formats={this.formats} placeholder="Write here" onChange={this.setValue} />
                      </Col>
                      </Row>

                    </div>
                   
                  </Form></div><div  className="col-1"></div></Row>
          
        </Container>
      </>
    );
  }
}
export default CreateBlog;
