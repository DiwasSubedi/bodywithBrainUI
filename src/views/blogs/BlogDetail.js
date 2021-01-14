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
import React from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./BlogDetail.css";
// reactstrap components
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
    Button, Form
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import BlogCard from "./BlogCards";
import { Redirect } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import allblogs from "../../jsondata/blog.json";
import LoadingSpinner from "../spinner/LoadingSpinner";

class BlogDetail extends React.Component {
  state = {};
constructor(props){
  super(props);
  this.state = {
    loading: false
  }
  this.submitBlog  = this.submitBlog.bind(this);
}

submitBlog(){
    this.setState({loading: true});
    let postData ={
        category : this.props.location.state.blog.categories,
        title: this.props.location.state.blog.title,
        content: this.props.location.state.blog.content,
        pictureUrl:this.props.location.state.blog.selectedPicture,
        createdBy:this.props.location.state.blog.creadedBy,
        lastUpdated: new Date(this.props.location.state.blog.createdOn),
        createdOn: new Date(this.props.location.state.blog.createdOn),
    }
    console.log(postData)
    fetch('https://4k2vjgm6q7.execute-api.us-west-2.amazonaws.com/dev/blog', {
        method: 'post',
        body: JSON.stringify(postData)
    }).then(data => {
        debugger;
        console.log(data);
        this.setState({loading: false});
        this.props.history.push({
            pathname:"/admin/blog/all",
            state: { blog: this.props.location.state.blog }
        })
    }) .catch(error => {
        alert("Transaction is unsuccessful, check logs with id ");
        this.setState({loading: false});
        console.log(error);
    });
}
  createMarkup() {
    return {__html: this.props.location.state.blog.content};
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7 bg-gradient-info" fluid>
          {/* Table */}
            {this.state.loading && <LoadingSpinner></LoadingSpinner>}
          <Row ><Col><h3>&nbsp;&nbsp;BODYWITHBRAIN BLOGS</h3></Col><Col><Button type="button" onClick={()=>{
            this.props.history.push({
              pathname:"/admin/blog/new",
              state: { blog: this.props.location.state.blog }
            })
            
            ;}} 
            
            className="float-right mb-2" color="default"><span><i class="fas fa-edit"></i>&nbsp;Edit Blog</span></Button></Col></Row>
          <Row>
          <div className=" col-1"></div>
            <div className=" col">
              {/* <h1>{this.props.location.state.title}</h1> */}
              <Card className="bg-white text-dark border-0 p-1">

                        <CardBody>
                            
                           
                            <CardTitle className=" h1 mb-0 text-uppercase"><a href="">{this.props.location.state.blog.categories.join(" / ")}</a></CardTitle>
                            <hr/>
                            <CardTitle className=" h1 mb-0">{this.props.location.state.blog.title}</CardTitle>
                            <small className=" text-muted">
                                by {this.props.location.state.blog.creadedBy} on {new Date(this.props.location.state.blog.createdOn).toDateString()}
                            </small>
                            <CardText className=" mt-4 container-fluid">
                            
                            <div dangerouslySetInnerHTML={this.createMarkup()} />
                            </CardText>
                        </CardBody>
                    </Card>
                <Button type="button" onClick={this.submitBlog} className="float-right mt-5 mb-2" color="default"><span><i class="fas fa-ok"></i>&nbsp;Submit</span></Button>

                <h1></h1>
                npm start >
              
            </div>
            <div className="col-1"></div>
          </Row>
        </Container>
      </>
    );
  }
}

export default BlogDetail;
