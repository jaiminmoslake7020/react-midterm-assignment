import React, { Component } from "react";
import Card2 from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

class Card extends Component {
    state = {
        moviedata : this.props.moviedata
    };

    async componentDidMount() {
    }

    render() {
        const {
            moviedata
        } = this.state;
        const {
            popularity,
            vote_count,
            poster_path,
            original_title,
            original_name,
            original_language,
            release_date,
            overview
        } = moviedata;
        return (
            <div className={"mt-5"} >

                    <Card2 style={{width:"100%"}} >
                        <div className={"row"} >
                            <div className={"col-md-6"} >
                                <div  >
                                    <CardContent >
                                        <Typography style={{textAlign:"left"}} component="h5" variant="h5">
                                            {original_title ? original_title : original_name}
                                        </Typography>
                                        <Typography style={{textAlign:"left"}} variant="subtitle1" color="textSecondary">
                                            Release Date: {release_date}
                                        </Typography>
                                        <Typography style={{textAlign:"left"}} variant="subtitle1" color="textSecondary">
                                            Popularity: {popularity}
                                        </Typography>
                                        <Box variant="subtitle2" overflow="hidden" color="textSecondary" style={{textAlign:"left", whiteSpace:"nowrap", width:"225px", height: "140px",paddingBottom:10, paddingTop:10}}  component="div" textOverflow="ellipsis" >
                                            {overview}
                                        </Box>
                                    </CardContent>
                                </div>
                            </div>
                            <div className={"col-md-6"}  >
                                { moviedata.poster_path ?
                                    <CardMedia
                                        style={{height:'300px'}}
                                        image={"https://image.tmdb.org/t/p/w220_and_h330_face/"+moviedata.poster_path}
                                        title={original_title}
                                    />
                                    : <div style={{height:'300px'}}></div>
                                }

                            </div>
                        </div>
                    </Card2>


            </div>
        );
    }
}
export default Card;


