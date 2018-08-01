import React, { Component } from 'react';
import loader from '../assets/three-dots.svg';

class Map extends Component{

    render() {

        return (
            <div style={{width: "100%", height: "100%"}}>
                <div id="map" style={{width: "100%", height: "100%"}} role="application">
                    <div className="container">
                        <div className="col-xs-12 col-md-3 col-md-offset-5 text-center">
                            <div className="loading">
                                <h3>Map is loading...</h3>
                                <img src={loader} alt="loading icon"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Map;