import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import ApiDataConfig, {
    getCategoryListTypesArrayByCategoryPath,
} from "../service/ApiDataConfig";



class InsideSelection extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            category: this.props.category,
            listType: this.props.listType,
            listTypeList: []
        }
    }

    componentDidMount(){
        console.log( "Here 1"  );
        if( typeof this.state.category !== "undefined" && this.state.category !== "INVALID" ){
            console.log( "Here 2"  );
           let list =  getCategoryListTypesArrayByCategoryPath( this.state.category );
            console.log( list  );
            console.log( this.state.listType  );
           this.setState( { 'listTypeList' : list } );
           console.log( list );
        }else{
            console.log( "Here 3"  );
            console.log( this.state.category  );
        }
    }

    render() {
        const {
            category,
            listType,
            listTypeList
        } = this.state;
        return (
            <div className="card style_1">

                { typeof listType !== "undefined" ?
                    <select className={"form-control mb-5 mt-5"} value={ listType } onChange={ this.props.handleListTypeChange } >
                        {
                            listTypeList.map( function ( value , index ){
                                return ( <option   key={index} value={value}    >{value}</option> );
                            })
                        }
                    </select> : null
                }

            </div>
        );
    }
}
export default withRouter(InsideSelection);


