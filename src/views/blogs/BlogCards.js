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
import React, { useState } from 'react';
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from 'react-copy-to-clipboard';
// reactstrap components
import { CSSTransition } from 'react-transition-group';
import './BlogCard.css';
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
	CardSubtitle,
	UncontrolledCollapse,
} from 'reactstrap';
// core components
import Header from 'components/Headers/Header.js';
class BlogCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
		this.getCards = this.getCards.bind(this);
	}

	getCards() {
		debugger;
		let returnCards = this.props.threeBlogs.map((blog) => {
			console.log(blog);
			return (
				<>
					<Card className='bg-white text-dark border-0 p-1 bwbblogcard'>
						<CardImg alt='...' src={blog.pictureUrl} top></CardImg>

						<CardBody>
							<CardTitle className=' h2 mb-0'>{blog.title}</CardTitle>
							<CardTitle className=' h5 mb-0'>
								<a href=''>{blog.category.join(' / ')}</a>
							</CardTitle>

							<small className=' text-muted'>
								by {blog.creadedBy} on {new Date(blog.lastUpdated).toDateString()}
							</small>
							<CardText className=' mt-4'>
								{/* <div dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 400) }} />
                                {this.state.collapse &&<a id={"toggler"+blog.id} href="#">
                                     "More"</a>}
                                {!this.state.collapse &&<a id={"toggler"+blog.id} href="#">
                                     "Less"</a>} */}
								<a id={'toggler' + blog.id} href='#'>
									"Show/Hide"
								</a>
								<UncontrolledCollapse toggler={'toggler' + blog.id}>
									<div dangerouslySetInnerHTML={{ __html: blog.content }} />
								</UncontrolledCollapse>
							</CardText>

							<Button className=' px-0' color='link' href='#pablo' onClick={(e) => e.preventDefault()}>
								View article
							</Button>
						</CardBody>
					</Card>

					<br />
				</>
			);
		});
		return returnCards;
	}

	render() {
		return (
			<>
				<div className=' card-deck mb-5'>{this.getCards()}</div>
			</>
		);
	}
}

export default BlogCard;
