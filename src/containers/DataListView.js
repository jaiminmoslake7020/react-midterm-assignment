import React, {Component} from "react";
import { makeAnApiCall } from "../service/api";
import Card from "./Card";
import { withRouter } from "react-router-dom";
import ApiDataConfig ,{  getCategoryPathList,  getCategoryListTypesArrayByCategoryPath, isInsideSelectionAllowed } from "../service/ApiDataConfig";
import InsideSelection from "./InsideSelection";
import { Box, Button , CircularProgress  } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';


class DataListView extends Component {

    constructor( props ) {
        console.log("Hi");

        super( props );
        this.handleListTypeChange = this.handleListTypeChange.bind(this)
        this.getData = this.getData.bind(this)
        this.paginate = this.paginate.bind(this);

    }

    paginate( event, value ){
        this.setState( {'page':value} )
    }

    state = {
        category : this.props.category ,
        listType:  this.props.listType  ,
        query: this.props.query,
        initialSetupFinished : false,
        moviedata: [],
        loading: true,
        inValidListType: true,
        serachInsertRequired : false,
        searchButtonClicked : this.props.searchButtonClicked,
        searchQueryRequired : false,

        page: 1 ,
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
            this.setState( {"serachInsertRequired":false});
            this.setState( {"serachInsertRequired":false});
        }else{
            console.log( this.state.category );
            console.log( this.state.listType );
            if( ( this.state.category === ApiDataConfig.CategoryPath.Search )
                && !this.state.searchButtonClicked && !( this.state.query === null || this.state.query === "" )
            ){
                this.setState( {"serachInsertRequired":true});
                this.setState( {"searchQueryRequired":false});
                this.setState({'loading': true});
                this.setState({'moviedata': []})
            }else if( ( this.state.category === ApiDataConfig.CategoryPath.Search
                && ( this.state.query === null || this.state.query === "" ) )
            ){
                this.setState( {"serachInsertRequired":false});
                this.setState( {"searchQueryRequired":true});
                this.setState({'loading': true});
                this.setState({'moviedata': []})
            }else{
                this.setState( {"serachInsertRequired":false});
                this.setState( {"searchQueryRequired":false});
                this.setState( {"initialSetupFinished":true,"inValidListType":false,'loading': true});
                await this.getData( this.state.category  , this.state.listType , this.state.query );
            }
        }
    }

    async handleListTypeChange ( event ) {
        this.setState({'moviedata': []})
        this.setState({'loading': true})

        console.log( event );
        console.log(  this.props.history );
        let value = event.target.value ;


        this.props.history.push( '/'+this.state.category+"/"+value );
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
            initialSetupFinished,
            serachInsertRequired,
            searchQueryRequired,
            page
        } = this.state;
        return (
            <div>

                { serachInsertRequired ?
                    <Alert severity="info" className={"mt-5 mb-5"} >Please initiate a search.</Alert>
                    : null
                }

                { searchQueryRequired ?
                    <Alert severity="info" className={"mt-5 mb-5"} >Please enter a search.</Alert>
                    : null
                }

                {  !serachInsertRequired && !searchQueryRequired ?
                    <div>
                        { initialSetupFinished === false ?
                            <div  className={"mt-5 mb-5"}>
                                <CircularProgress style={{ marginTop:20 }} color="secondary" />
                            </div>
                            :
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
                                                { moviedata.length > 0 ?
                                                    <div className={"col-12 "} >
                                                        <div  className={"row"}  >
                                                            {moviedata.map(function (value, index) {
                                                                return (
                                                                    ( (index < 10 && page%2===1) ||
                                                                    (index >= 10 && page%2===0) ) )  ?
                                                                    <div className={"col-12 col-md-6 mt-5"} >
                                                                        <Card  key={index} moviedata={value}/>
                                                                    </div>
                                                                    : null
                                                                }
                                                            )
                                                            }
                                                        </div>
                                                        <div className={"row justify-content-center text-center mt-5 mb-5"} >
                                                            <div className={"col-12 text-center"} >
                                                                <Pagination count={2} onChange={this.paginate} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null
                                                }

                                                {
                                                    moviedata.length === 0 && category == ApiDataConfig.CategoryPath.Search ?
                                                        <div className={"col-12"}>
                                                            <Alert severity="info" className={"mt-5 mb-5"} >{ApiDataConfig.SearchMsgs.noSearchResults}</Alert>
                                                        </div>
                                                        : null
                                                }

                                            </div>
                                            : <CircularProgress color="secondary" />
                                        }
                                    </div>

                                    : <CircularProgress color="secondary" /> }

                            </div>
                        }
                    </div> : null
                }



            </div>
        );
    }
}

export default withRouter(DataListView);