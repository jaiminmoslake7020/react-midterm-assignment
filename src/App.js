import './App.css';
import React, {useEffect, Component} from "react";
import {
    BrowserRouter as Router,
    Switch, Link,
    Route, useParams, withRouter
} from "react-router-dom";
import DataListView from "./containers/DataListView";
import ApiDataConfig, {getCategoryListTypesArrayByCategoryPath} from "./service/ApiDataConfig";
import {Box, Button, CircularProgress, Tabs, Tab, Paper} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


class App extends Component {

    constructor(props) {
        super(props);
        this.dynamicRoute = this.dynamicRoute.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async dynamicRoute(cat, list) {
        console.log(cat, list);
        console.log('Loading');
        console.log(this.state);
        this.setState({loading: true})
        this.setState({category: 'INVALID', listType: 'INVALID'})
        await this.setState({category: cat, listType: list})
        console.log(this.state);
        console.log('Loading 2');
        this.setState({loading: false})
    }

    state = {
        loading: false,
        category: this.props.category,
        listType: this.props.listType,
        selectedItem: 0,
      searchTypes: []
    };

    handleChange(event, value) {
        this.setState({selectedItem: value});

        let cat = null ;
        let list = null ;
        if (value === 0 ) {
          cat = ApiDataConfig.CategoryPath.Movie ;
          list = ApiDataConfig.DefaultLinks.Movie ;
        } else if (value === 1) {
          cat = ApiDataConfig.CategoryPath.Search ;
          list = ApiDataConfig.DefaultLinks.Search ;
        } else if (value === 2) {
          cat = ApiDataConfig.CategoryPath.TV ;
          list = ApiDataConfig.DefaultLinks.TV ;
        }

        this.dynamicRoute( cat , list );
        this.props.history.push('/'+cat+'/'+list);
    }

  componentDidMount(){
      let list =  getCategoryListTypesArrayByCategoryPath( ApiDataConfig.CategoryPath.Search );
      this.setState( { 'searchTypes' : list } );
      console.log( list  );
      console.log( this.state.searchTypes  );
  }

    render() {

        const {
            category,
            listType,
            loading,
            selectedItem,
          searchTypes
        } = this.state;

        return (
            <div className="App container ">


                <AppBar position="static" className={"mb-5 mt-5 text-center"}>
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" className={"text-center"}>
                            React Movies App
                        </Typography>
                    </Toolbar>
                </AppBar>


              <div className={"row justify-content-center"}>
                <div className={"col-md-8 "}>

                  <FormControl variant="outlined" style={{minWidth: 520}} className={" mb-5 mt-5 "}>
                    <InputLabel id="demo-simple-select-outlined-label">Search Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        // value={ listType }
                        // onChange={ this.props.handleListTypeChange }
                        label="Category"
                    >
                      {
                        searchTypes.map( function ( value , index ){
                          return ( <MenuItem  key={index} value={value} >&nbsp;{value}&nbsp;&nbsp;&nbsp;</MenuItem> );
                        })
                      }
                    </Select>
                  </FormControl>

                </div>
              </div>
              

              <Paper square>
                    <Tabs
                        value={selectedItem}
                        indicatorColor="primary"
                        onChange={this.handleChange}
                        textColor="primary"
                    >
                        <Tab label="MOVIES"/>
                        <Tab label="SEARCH RESULTS"/>
                        <Tab label="TV SHOWS"/>
                    </Tabs>
                </Paper>


                {loading ?
                    <CircularProgress color="secondary"/>
                    :
                    <DataListView category={ApiDataConfig.Default.Category} listType={ApiDataConfig.Default.ListType}/>
                }


            </div>
        );
    }

}

export default withRouter(App);
