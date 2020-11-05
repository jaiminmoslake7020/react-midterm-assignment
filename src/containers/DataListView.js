import React, {Component} from "react";
import { makeAnApiCall } from "../service/api";
import Card from "./Card";
import { withRouter } from "react-router-dom";
import ApiDataConfig ,{  getCategoryPathList,  getCategoryListTypesArrayByCategoryPath, isInsideSelectionAllowed } from "../service/ApiDataConfig";
import InsideSelection from "./InsideSelection";
import { Box, Button , CircularProgress } from '@material-ui/core';



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

function getQuery( props ){
    let category = getCategoryPath( props );
    if( category !== ApiDataConfig.Category.Search ){
        return null;
    }else{
        if( typeof props !== "undefined" &&
            typeof props.match !== "undefined" &&
            typeof props.match.params !== "undefined" &&
            typeof props.match.params.query !== "undefined"
        ){
            if( props.match.params.query === "" ){
                return "INVALID";
            }else{
                return props.match.params.query;
            }
        }
        return "INVALID";
    }
}

class DataListView extends Component {

    constructor( props ) {
        console.log("Hi");

        super( props );
        this.handleListTypeChange = this.handleListTypeChange.bind(this)
        this.getData = this.getData.bind(this)

    }

    state = {
        category : getCategoryPath( this.props ) ,
        listType:  getListType( this.props ) ,
        initialSetupFinished : false,
        moviedata: [],
        loading: true,
        inValidListType: true,
        query: getQuery( this.props ),
    };

    async getData( category , listType , query ){
        let getMovies = await makeAnApiCall( category  , listType , query );
        if (typeof getMovies !== "undefined") {
            this.setState({'loading': false})
            this.setState({'moviedata': getMovies.results})
        }
    }

    async componentDidMount() {
        if( this.state.category === "INVALID" || this.state.listType === "INVALID" || this.state.query === "INVALID" ){
            this.setState( {"initialSetupFinished":true,"inValidListType":true,'loading': false});
        }else{
            console.log( this.state.category );
            console.log( this.state.listType );
            this.setState( {"initialSetupFinished":true,"inValidListType":false,'loading': true});
            await this.getData( this.state.category  , this.state.listType , this.state.query );
        }
    }

    async handleListTypeChange ( event ) {
        this.setState({'moviedata': []})
        this.setState({'loading': true})

        console.log( event );
        console.log(  this.props.history );
        let value = event.target.value ;


        this.props.history.push( "/"+this.state.category+"/"+value );
        this.setState( { listType : value });
        await this.getData( this.state.category  , value , this.state.query );
    }

    render() {
        const {
            category,
            listType,
            moviedata,
            loading,
            inValidListType,
            initialSetupFinished
        } = this.state;
        return (
            <div>
                { initialSetupFinished === false  ? <CircularProgress color="secondary" />  :
                       <div>
                           { inValidListType && !loading ? <p>{listType} is invalid! Please reselect list type</p> : null }

                           { !inValidListType && !loading ?

                               <div>
                                   { isInsideSelectionAllowed( category ) ?
                                       <InsideSelection category={category} listType={listType} handleListTypeChange={ this.handleListTypeChange } />
                                       : null
                                   }

                                   { !loading  && typeof moviedata !== "undefined" ?
                                       <div className="row">
                                           {moviedata.map(function (value, index) {
                                               return (
                                                   <Card className={"col-md-3"} key={index} moviedata={value}/>
                                               )
                                           })}
                                       </div>
                                       : <CircularProgress color="secondary" />
                                   }
                               </div>

                               : <CircularProgress color="secondary" /> }

                       </div>
                }
            </div>
        );
    }
}

export default withRouter(DataListView);