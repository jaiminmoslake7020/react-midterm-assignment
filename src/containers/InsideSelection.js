import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {getCategoryListTypesArrayByCategoryPath,} from "../service/ApiDataConfig";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
            <div className="">

                { typeof listType !== "undefined" ?

                    <FormControl variant="outlined" >
                        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={ listType }
                            onChange={ this.props.handleListTypeChange }
                            label="Category"
                        >
                            {
                                listTypeList.map( function ( value , index ){
                                    return ( <MenuItem  key={index} value={value} style={{textTransform:"capitalize"}} >{value.replaceAll("_"," ")}</MenuItem> );
                                })
                            }
                        </Select>
                    </FormControl>

                    : null
                }


            </div>
        );
    }
}
export default withRouter(InsideSelection);


