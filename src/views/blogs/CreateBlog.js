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
import Amplify, { Auth, Storage } from 'aws-amplify';
import LoadingIndicator from "common/LoadingIndicator";
import { Redirect } from "react-router-dom";
import "./BlogDetail.css";
import "react-quill/dist/quill.core.css";
import Select from 'react-select';
var Image = Quill.import('formats/image');
Image.className = 'img-custom';
Quill.register(Image, true);
class CreateBlog extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      catogeries: '',
      post: "",
      serverError: false,
      serverMessage: '',
      value: "Example please use this to write blog",
      myInp: null,
      loading: true,
      user: undefined,
      selectedPicture: null,
      options: []
    };
    this.quill = React.createRef();
    this.imageHandler = this.imageHandler.bind(this);
    this.setValue = this.setValue.bind(this);
    this.createBlogForReview = this.createBlogForReview.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);


  }

  setValue(val) {
    this.setState({
      value: val
    })
  }

  handlePictureChange = (selectedOption) => {
    this.setState({
      selectedPicture: selectedOption
    });
    console.log(`Option selected:`, selectedOption);
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue
    });
  }


  async componentDidMount() {
    debugger;
    await Auth.currentAuthenticatedUser().then((user) => {
      this.setState({
        loading: false,
        user: user
      });
      console.log("USerInfo", user);
    })
      .catch((exp) => {
        console.log("Caught", exp);
        this.setState({
          loading: false
        });
        this.props.history.push("/auth/login")
      });
    if (this.props.location.state) {
      let blog = this.props.location.state.blog
      this.setState({
        categories: blog.categories.join(","),
        title: blog.title,
      })
      console.log(blog.content)
      this.setValue(blog.content);
      if (blog.pictureOptions.length > 0) {
        blog.pictureOptions.forEach(url => {
          this.setState(prevState => ({
            options: [...prevState.options, { value: url, label: <div><img className={"mr-10"} src={url} height="60px" width="60px" />{url.slice(url.indexOf("public/") + 7)} </div> }]
          }))
          debugger;
          if (url == blog.selectedPicture) {
            debugger;
            this.setState({
              selectedPicture: { value: url, label: <div><img className={"mr-10"} src={url} height="60px" width="60px" />{url.slice(url.indexOf("public/") + 7)} </div> }
            })
          }
        })
      }
      this.setState()

    }
  }

  imageHandler() {
    debugger;
    let currentUser = this.state.user.attributes.email.substring(0, this.state.user.attributes.email.indexOf('@'));
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    let randomNumber = Math.floor(Math.random() * 10000000000000000) + 1

    input.onchange = async function () {
      const file = input.files[0];
      console.log('User trying to uplaod this:', file);
      Storage.put(currentUser + "/" + randomNumber + ".jpg", file)
        .then(result => {
          if (this.state.options.length == 0) {
            this.state.options.push({ value: "https://bodywithbrain-blog-images.s3-us-west-2.amazonaws.com/public/" + result.key, label: <div><img className={"mr-10"} src={"https://bodywithbrain-blog-images.s3-us-west-2.amazonaws.com/public/" + result.key} height="60px" width="60px" />{result.key} </div> })
            this.setState({
              selectedPicture: this.state.options[0]
            });
          } else {
            this.setState(prevState => ({
              options: [...prevState.options, { value: "https://bodywithbrain-blog-images.s3-us-west-2.amazonaws.com/public/" + result.key, label: <div><img className={"mr-10"} src={"https://bodywithbrain-blog-images.s3-us-west-2.amazonaws.com/public/" + result.key} height="60px" width="60px" />{result.key} </div> }]
            }))
          }
          const range = this.quill.current.editor.getSelection();
          this.quill.current.editor.insertEmbed(range.index, 'image', "https://bodywithbrain-blog-images.s3-us-west-2.amazonaws.com/public/" + result.key);
        })
        .catch(err => console.log(err));
    }.bind(this); // react thing
  }


  modules = {
    toolbar: {
      container: [
        [{ header: [3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code"],
        [{ 'color': [] }, { 'background': [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
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
    'link', 'image', 'color', 'video'
  ];
  createBlogForReview() {
    console.log(this.state);
    let blog = {
      content: this.state.value,
      categories: this.state.categories.split(','),
      title: this.state.title,
      createdOn: new Date().toDateString(),
      creadedBy: this.state.user.attributes['custom:fullname'],
      updatedOn: new Date().toDateString(),
      pictureOptions: this.state.options.map(value => {
        return value.value
      }),
      selectedPicture: this.state.selectedPicture ? this.state.selectedPicture.value : ""
    };
    console.log(blog);
    this.props.history.push({
      pathname: '/admin/blog/detail',
      search: '?query=blog',
      state: { blog: blog }
    });
  }




  render() {
    if (!this.state.loading && !this.state.user) {
      debugger;
      return (<Redirect to={{
        pathname: "/auth/register",
        state: { from: this.props.location }
      }} />);
    }
    return (
      <>
        <Container className=" mt--7  " fluid>
          {/* Table */}
          <Row ><Col><h3>&nbsp;&nbsp;NEW BLOG</h3></Col></Row>

          <Row className=" mt-7" ><div className="col-2"></div><div className="col-9"><Form>
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
                      name="title"
                      placeholder="Title"
                      type="text"
                      value={this.state.title} onChange={this.handleInputChange}
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
                      placeholder="Food,Workout"
                      name="categories"
                      type="text"
                      value={this.state.categories} onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="cover-picture"
                    >
                      Cover Picture
                            </label>
                    <Select
                      value={this.state.selectedPicture}
                      onChange={this.handlePictureChange}
                      options={this.state.options}
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
                  <ReactQuill ref={this.quill} value={this.state.value} className="bg-white" theme={"snow"} modules={this.modules} formats={this.formats} placeholder="Write here" onChange={this.setValue} />
                </Col>
              </Row>
            </div>
            <Button type="button" onClick={this.createBlogForReview} className="float-right mb-2" color="default"><span><i class="fas fa-eye"></i>&nbsp;Review Blog</span></Button>
          </Form>
          </div><div className="col-1"></div></Row>


        </Container>
      </>
    );
  }


}
export default CreateBlog;
