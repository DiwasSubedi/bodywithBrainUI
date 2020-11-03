import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
// reactstrap components
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import { Auth } from 'aws-amplify';
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      loading: true
    };
  }

  async componentDidMount() {
    debugger;
    await Auth.currentAuthenticatedUser().then((user) => {
      this.setState({
        loading: false,
        user: user
      });
      console.debug("USerInfo", user);
    })
      .catch((exp) => {
        console.log("Caught", exp);
        this.setState({
          loading: false
        });
      });

  }

  render() {
    return (
      <>
        <Navbar
          className="navbar-horizontal navbar-dark bg-gradient-info mt-0 border-bottom-5 border-dark"
          expand="lg"
        >
          <Container className="m-0" fluid={true}>
            <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
              BODYWITHBRAIN
            </NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink href="/admin/index">
                  <i class="fas fa-home text-dark"></i>Home <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/blog">
                  <i class="fab fa-blogger-b text-dark"></i>Blogs <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>
              {!this.state.user &&
                <NavItem>
                  <NavLink href="/auth/register">
                    <i class="fas fa-user-plus text-dark" ></i>Sign Up <span className="sr-only">(current)</span>
                  </NavLink>
                </NavItem>}
              {!this.state.user && <NavItem>
                <NavLink href="/auth/login">
                  <i class="fas fa-sign-in-alt text-dark"></i>Sign In <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>
              }
              {this.state.user &&
                <NavItem>
                  <UncontrolledDropdown navbar>
                    <DropdownToggle nav className="m-0 p-0">
                      <NavLink>
                        <i class="fas fa-cog  text-dark"></i> Profile
                      </NavLink>
                    </DropdownToggle>
                    <DropdownMenu
                      right
                    >
                      <DropdownItem
                        href="#pablo"
                      >
                        My Profile
                    </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                      >
                        Subscriptions
                    </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                      >
                        My Blogs
                    </DropdownItem>
                      <DropdownItem
                        href="/admin/index" onClick={e => {
                          Auth.signOut().then(() => {
                            this.props.history.push("/")
                          })

                        }}>

                        Sign Out
                    </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>}
            </Nav>

          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavBar;