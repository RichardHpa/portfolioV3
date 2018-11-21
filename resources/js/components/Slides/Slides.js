import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Slides extends Component {
    render () {

        return (
            <div className="container ml-0">
                <div className="row">
                    <div className="col">
                        <h1>Slides Page</h1>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Link className="btn btn-theme-color" to='./slides/create'>Add New Slide</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Slides
