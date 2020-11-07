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
import allblogs from "../../jsondata/blog.json";
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
  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

class Blog extends React.Component {
  state = {};

  getAllBlogs(){
    debugger;
      var threeBlogArray = [];
      var threeBlog = [];
      allblogs.forEach((blog,index)=>{
          if(threeBlog && threeBlog.length == 3 ){
            let copyOfThreeBlog = Object.assign({}, threeBlog);
            threeBlogArray.push(copyOfThreeBlog);
            threeBlog.length = 0;
          }else{
            threeBlog.push(blog)
          }
          if(index == allblogs.length-1 && threeBlog.length >0){
            threeBlogArray.push(threeBlog)
          }     
      });
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7 bg-gradient-info" fluid>
          {/* Table */}
          <Row ><Col><h3>&nbsp;&nbsp;BODYWITHBRAIN BLOGS</h3></Col></Row>
          <Row>

            <div className=" col">
            <div className=" card-deck mb-5">
              <Card className="bg-white text-dark border-0 p-1">
                <CardImg
                  alt="..."
                  src="https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/alejandro-escamilla.jpg"
                  height="300px"
                  top
                ></CardImg>
                <CardBody>
                  <CardTitle className=" h2 mb-0">Get started with Argon</CardTitle>
                  <small className=" text-muted">
                    by John Snow on Oct 29th at 10:23 AM
                  </small>
                  <CardText className=" mt-4">
                    Argon is a great free UI package based on Bootstrap 4 that includes
                    the most important components and features.
                 </CardText>
                  <Button
                    className=" px-0"
                    color="link"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    View article
                  </Button>
                </CardBody>
              </Card>
              <br/>
              
              <Card className="bg-white text-dark border-0 p-1">
                <CardImg
                  alt="..."
                  src="https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/alejandro-escamilla.jpg"
                  height="300px"
                  top
                ></CardImg>
                <CardBody>
                  <CardTitle className=" h2 mb-0">Get started with Argon</CardTitle>
                  <small className=" text-muted">
                    by John Snow on Oct 29th at 10:23 AM
                  </small>
                  <CardText className=" mt-4">
                    Argon is a great free UI package based on Bootstrap 4 that includes
                    the most important components and features.
                 </CardText>
                  <Button
                    className=" px-0"
                    color="link"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    View article
                  </Button>
                </CardBody>
              </Card>
              <Card className="bg-white text-dark border-0 p-1">
                <CardImg
                  alt="..."
                  src="https://demos.creative-tim.com/argon-design-system-pro/assets/img/faces/alejandro-escamilla.jpg"
                  height="300px"
                  top
                ></CardImg>
                <CardBody>
                  <CardTitle className=" h2 mb-0">Get started with Argon</CardTitle>
                  <small className=" text-muted">
                    by John Snow on Oct 29th at 10:23 AM
                  </small>
                  <CardText className=" mt-4">
                    Argon is a great free UI package based on Bootstrap 4 that includes
                    the most important components and features.
                 </CardText>
                  <Button
                    className=" px-0"
                    color="link"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    View article
                  </Button>
                </CardBody>
              </Card>
              </div>
            
              {this.getAllBlogs()}
            
            </div>
            
          </Row>
        </Container>
      </>
    );
  }
}

export default Blog;
