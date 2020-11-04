import './App.css';
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch, Link,
  Route, useParams, withRouter
} from "react-router-dom";
import DataListView from "./containers/DataListView";
import ApiDataConfig from "./service/ApiDataConfig";


function App() {

  useEffect( () => {
    console.log( "Hello" );
  } );

  return (
    <div className="App container ">
      <Router  >
        <div>

          <nav>
            <ul>
              <li>
                <a href={"/movie/"+ApiDataConfig.DefaultLinks.Movie}>Movie</a>
              </li>
              <li>
                <a href={"/search/"+ApiDataConfig.DefaultLinks.search}>Search</a>
              </li>
              <li>
                <a href={"/tv/"+ApiDataConfig.DefaultLinks.TV}>TV Shows</a>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/:category/:listType" children={<DataListView />} />
            <Route path="/" exact >
              <DataListView category={ ApiDataConfig.Default.Category } listType={ ApiDataConfig.Default.ListType } />
            </Route>
          </Switch>


        </div>
      </Router>
    </div>
  );
}

export default App;
