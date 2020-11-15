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
import BlogCard from "./BlogCards";
import { Redirect } from "react-router-dom";

class Blog extends React.Component {
  state = {};
constructor(props){
  super(props);
  this.state = {
    createNew: false
  }

  this.getAllBlogs = this.getAllBlogs.bind(this);
} 
  getAllBlogs(){
      var threeBlogArray = [];
      var threeBlog = [];
      allblogs.forEach((blog,index)=>{
          if(threeBlog && threeBlog.length == 3 ){
            let copyOfThreeBlog = Array.from(threeBlog)
            threeBlogArray.push(copyOfThreeBlog);
            threeBlog.length = 0;
          }else{
            threeBlog.push(blog)
          }
          if(index == allblogs.length-1 && threeBlog.length >0){
            threeBlogArray.push(threeBlog)
          }     
      });
      var returnList = threeBlogArray.map(threeBlogs=>{
        return <BlogCard threeBlogs={threeBlogs}></BlogCard>
      })
      debugger;
     return returnList;
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7 bg-gradient-info" fluid>
          {/* Table */}
          <Row ><Col><h3>&nbsp;&nbsp;BODYWITHBRAIN BLOGS</h3></Col><Col><Button type="button" onClick={()=>{this.props.history.push("/admin/blog/new");}} className="float-right mb-2" color="default"><span><i class="fas fa-edit"></i>&nbsp;Create Blog</span></Button></Col></Row>
          <Row>

            <div className=" col">
            
                   {this.getAllBlogs()} 
           
               
            </div>
            
          </Row>
        </Container>
      </>
    );
  }
}

export default Blog;
