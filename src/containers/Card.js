import React, { Component } from "react";

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
            original_language,
            release_date
        } = moviedata;
        return (
            <div className="card style_1">
                <div className="image">
                    <div className="wrapper">
                        <a className="image" href="/movie/724989" title="original_title">
                            <img className="poster  "
                                 src={"https://image.tmdb.org/t/p/w220_and_h330_face/"+moviedata.poster_path}  alt="original_title"/>
                        </a>
                    </div>
                    <div className="options" data-id="724989" data-object-id="5f10be712495ab003437ca87" data-media-type="movie"
                         data-role="tooltip">
                        <a className="no_click" href="#">
                            <div className="glyphicons_v2 circle-more white"></div>
                        </a>
                    </div>
                </div>
                <div className="content">
                    <div className="consensus tight">
                        <div className="outer_ring">
                            <div className="user_score_chart 5f10be712495ab003437ca87" data-percent="44.0"
                                 data-track-color="#423d0f" data-bar-color="#d2d531">
                                <div className="percent">

                                    <span className="icon icon-r44"></span>

                                </div>
                                <canvas height="34" width="34"></canvas>
                            </div>
                        </div>
                    </div>

                    <h2><a href="/movie/724989" title={original_title}>{original_title}</a></h2>
                    <p>{release_date}</p>
                </div>

                <div className="hover 724989"></div>
            </div>
        );
    }
}
export default Card;


