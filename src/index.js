import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';

import App_1 from './App_1';
import * as serviceWorker from './serviceWorker';
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Amplify, { Auth,Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
Amplify.configure({
  Storage: {
      AWSS3: {
          bucket: 'bodywithbrain-blog-images', //REQUIRED -  Amazon S3 bucket name
          region: 'us-west-2', //OPTIONAL -  Amazon service region
      }
  }
});
ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter><App_1 /></BrowserRouter>
    
  </React.StrictMode>
   ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
