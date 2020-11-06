import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter, Route, Switch,
} from "react-router-dom";
import DataListView from "./containers/DataListView";
import ApiDataConfig from "./service/ApiDataConfig";


ReactDOM.render(

        <BrowserRouter >

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/:category/:listType"  >
                    <App />
                </Route>
                <Route path="/" exact >
                    <App category={ ApiDataConfig.Default.Category } listType={ ApiDataConfig.Default.ListType } />
                </Route>
                <Route exact path="*"  >
                    <App />
                </Route>

            </Switch>

        </BrowserRouter>

    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
