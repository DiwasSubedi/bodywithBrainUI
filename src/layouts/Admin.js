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
import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import NavBar from 'components/Navbars/NavBar';
import routes from 'routes.js';
import Row from 'reactstrap/lib/Row';
import Header from 'components/Headers/Header';

class Admin extends React.Component {
	componentDidUpdate(e) {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		this.refs.mainContent.scrollTop = 0;
	}

	getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === '/admin') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} children={prop.sidebar}/>;
			} else {
				return null;
			}
		});
	};

	getBrandText = (path) => {
		for (let i = 0; i < routes.length; i++) {
			if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].name;
			}
		}
		return 'Brand';
	};

	render() {
		return (
			<>
				<div className='main-content' ref='mainContent'>
					<NavBar />
					<Header />
					<Row>
						<div className="col-1">
						</div>
						<div className="col-10">
						<Switch>
							{this.getRoutes(routes)}
							<Redirect from='*' to='/admin/index' />
						</Switch>
						</div>
						<div className="col-1">
						</div>
					</Row>
					

					<Container fluid>
						<AdminFooter />
					</Container>
				</div>
			</>
		);
	}
}

export default Admin;
