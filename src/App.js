import './App.css';
import React, {useEffect, Component} from "react";
import {
    BrowserRouter as Router,
    Switch, Link,
    Route, useParams, withRouter
} from "react-router-dom";
import DataListView from "./containers/DataListView";
import ApiDataConfig ,{  getCategoryPathList,  getCategoryListTypesArrayByCategoryPath, isInsideSelectionAllowed } from "./service/ApiDataConfig";
import {Box, Button, CircularProgress, Tabs, Tab, Paper, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function getSelectedItem( props ){
    let category = getCategoryPath( props );
    if( ApiDataConfig.TabCategoryPathSelectedItem.hasOwnProperty( category ) ){
        return ApiDataConfig.TabCategoryPathSelectedItem[ category ];
    }
    return 0 ;
}

function getCategoryPath( props ){
    let catList = getCategoryPathList();
    if( typeof props !== "undefined" &&
        typeof props.match !== "undefined" &&
        typeof props.match.params !== "undefined" &&
        typeof props.match.params.category !== "undefined" &&
        catList.includes( props.match.params.category )
    ){
        return props.match.params.category;
    }

    if( typeof props !== "undefined" &&
        typeof props.category !== "undefined" &&
        catList.includes( props.category )
    ){
        return props.category;
    }
    return "INVALID";
}

function getListType( props ){
    let category = getCategoryPath( props );
    if( category === "INVALID" ){
        return "INVALID";
    }else{
        let catListTypes = getCategoryListTypesArrayByCategoryPath( category );
        if( typeof props !== "undefined" &&
            typeof props.match !== "undefined" &&
            typeof props.match.params !== "undefined" &&
            typeof props.match.params.listType !== "undefined" &&
            catListTypes.includes( props.match.params.listType )
        ){
            return props.match.params.listType;
        }

        if( typeof props !== "undefined" &&
            typeof props.listType !== "undefined" &&
            catListTypes.includes( props.listType )
        ){
            return props.listType;
        }
        return "INVALID";
    }
}

function getListTypeSearch(  props ){
    let category = getCategoryPath( props );
    if( category === ApiDataConfig.CategoryPath.Search ){
        return getListType( props );
    }
    return  ApiDataConfig.DefaultLinks.Search;
}

class App extends Component {

    constructor(props) {
        super(props);
        this.dynamicRoute = this.dynamicRoute.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.handleClick = this.handleClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleChangeSearch = this.handleChangeSearch.bind(this)
        this.handleChangeQueryType = this.handleChangeQueryType.bind(this)
        this.initiateSearch = this.initiateSearch.bind(this)
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
        category:  getCategoryPath( this.props ) ,
        listType: getListType( this.props ),
        selectedItem: getSelectedItem( this.props ),
        searchTypes: [],
        searchQuery : "" ,
        searchQueryType : getListTypeSearch( this.props ) ,
        searchButtonClicked : false
    };

    initiateSearch( list , push = true ){
        let cat = ApiDataConfig.CategoryPath.Search ;
        if( !list ){
            list = this.state.searchQueryType ;
        }

        this.setState({selectedItem: 1});
        this.dynamicRoute( cat , list );

        if( push ){
            this.props.history.push('/'+cat+'/'+list+"?query="+this.state.searchQuery);
        }else{
            this.props.history.replace('/'+cat+'/'+list+"?query="+this.state.searchQuery);
        }
    }

    handleClick( event ){
        this.setState( { searchButtonClicked : true });
        this.initiateSearch();
    }

    handleChangeSearch( event ){
        this.setState( { searchButtonClicked : false });
        this.setState( { searchQuery : event.target.value });
        this.initiateSearch( undefined , true );
    }

    handleChangeQueryType( event ){
        console.log( event );
        this.setState( { searchButtonClicked : false });
        this.setState( { searchQueryType : event.target.value });
        this.initiateSearch( event.target.value );
    }

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

     let searchParams = new  URLSearchParams( window.location.search );
     console.log( searchParams );
      console.log( searchParams.has( 'query' ) );
     if( searchParams.has( 'query' ) ){
         this.setState( {'searchQuery' : searchParams.get('query') } );
     }
  }

    render() {

        const {
            category,
            listType,
            loading,
            selectedItem,
          searchTypes,
            searchButtonClicked,
            searchQuery,
            searchQueryType
        } = this.state;

        return (
            <div className="App container ">


                <AppBar position="static" color={"transparent"} className={"mb-5 mt-5 "}>
                    <Toolbar variant="dense"  >
                        <Typography variant="h6" style={{ textAlign: "center" , width: "100%" }} >
                            React Movies App
                        </Typography>
                    </Toolbar>
                </AppBar>


              <div className={"row justify-content-center"}>
                <div className={"col-md-10 col-12 col-sm-12 mb-5  "}>

                    <div className={"row"} >

                        <div className={"col-12 col-md-7 mt-3 mb-3 "} >
                            <TextField value={searchQuery} onChange={this.handleChangeSearch}  id="search" style={{minWidth: "100%"}} label="Search" variant="outlined" />
                        </div>
                        <div className={"col-12 col-md-3 mt-3 mb-3 "} >
                            <FormControl variant="outlined" style={{minWidth: "100%"}} >
                                <InputLabel id="demo-simple-select-outlined-label">Search Category</InputLabel>
                                <Select
                                    onChange={this.handleChangeQueryType}
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={ searchQueryType }
                                    label="Category"
                                >
                                    {
                                        searchTypes.map( function ( value , index ){
                                            return ( <MenuItem  key={index} value={value} style={{textTransform:"capitalize"}} >{value.replaceAll("_"," ")}</MenuItem> );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className={"col-12 col-md-2 mt-3 mb-3  "} >
                            <Button variant="contained" color="primary" className={" mt-2 "} onClick={this.handleClick} >
                                Search
                            </Button>
                        </div>

                    </div>

                </div>
              </div>

                <div className={"mt-5 mb-5"} >
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
                </div>


                {loading ?
                    <div  >
                        <CircularProgress color="secondary"/>
                    </div>
                    :
                    <DataListView
                        query={searchQuery}
                        category={category}
                        listType={listType}
                        searchButtonClicked={searchButtonClicked}
                    />
                }


                <div className={"row"}>
                    <div className={"col-12 mb-5 mt-5"} >
                        <p className={"mb-1"} >Powered By</p>
                        <img
                            style={{ maxWidth : "200px" }}
                            className={" img "}
                            title={"The Movie Db"}
                            src={"https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"}
                        />
                    </div>
                </div>


            </div>
        );
    }

}

export default withRouter(App);
