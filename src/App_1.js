import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import React, {Component} from "react";
import Alert from 'react-s-alert';
import LoadingIndicator from "./common/LoadingIndicator";





class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
        }
    }

    componentDidMount() {
        
    }



    render() {
            if(this.state.loading) {
                return <LoadingIndicator />
            }

            return (
                <div className="app">
                    {/*<div className="app-top-box">
                        <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
                    </div>*/}
                    <div className="app-body">
                        <Switch>
                            <Route path="/admin" render={props => <AdminLayout {...props} />} />
                            <Route path="/auth" render={props => <AuthLayout {...props} />} />
                            <Redirect from="/" to="/admin/blog/all" />
                        </Switch>
                    </div>
                    <Alert stack={{limit: 3}}
                           timeout = {3000}
                           position='top-right' effect='slide' offset={65} />
                </div>
            );
        }
    }

    export default App;

