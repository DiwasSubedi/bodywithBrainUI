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
/*eslint-disable*/
import React from "react";

// reactstrap components
import {Container, Row, Col, Nav, NavItem, NavLink, NavbarBrand} from "reactstrap";
import fulllogo from "../../assets/img/brand/PNG3.png";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer pt-2 pb-2">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              <span> © 2020 &nbsp;&nbsp;</span>
              <a
                className="font-weight-bold ml-1"
                href="https://www.google.com"
                rel="noopener noreferrer"
                target="_blank"
              >

                <img className={"text-center"} style={{height:"15px",paddingBottom:"3px"}} src={fulllogo}></img>
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">


              <NavItem>
                <NavLink
                  href="https://www.google.com/maps/place/14810+E+40th+Pl,+Tulsa,+OK+74134/@36.1050328,-95.8137116,17z/data=!3m1!4b1!4m5!3m4!1s0x87b68b5edf1e382b:0x68359b4a5b8b38b1!8m2!3d36.1050328!4d-95.8115229"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                 Contact Us
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
