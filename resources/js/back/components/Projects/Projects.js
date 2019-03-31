import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Loader from '../Loader';

class Projects extends Component {
    constructor () {
      super()
      this.state = {
        projects: [],
        pageLoaded: true
      }
    }

    render () {
        const { projects , pageLoaded} = this.state;
        if (!pageLoaded) {
            return (
                <Loader />
            )
        } else {
            return (
                <div className="container ml-0">
                    <div className="row">
                        <div className="col">
                        <h1>All Projects</h1>
                        <hr/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <Link className="btn btn-theme-color" to='./projects/create'>Add New Project</Link>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Projects;
