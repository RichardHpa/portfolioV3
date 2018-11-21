import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Projects extends Component {
    render () {

        return (
            <div className="container ml-0">
                <div className="row">
                    <div className="col">
                        <h1>Projects Page</h1>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Link className="btn btn-theme-color" to='./projects/create'>Add New Project</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Projects
