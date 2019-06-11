import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Loader from '../Loader';

class Projects extends Component {
    constructor () {
      super()
      this.state = {
        projects: [],
        pageLoaded: false
      }
    }

    componentDidMount () {
        axios.get('/api/projects').then(response => {
            this.setState({
                projects: response.data,
                pageLoaded: true
            })
        })
    }

    render () {
        const { projects , pageLoaded} = this.state;
        if (!pageLoaded) {
            return (
                <Loader />
            )
        } else {
            console.log(projects);
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
                    <div className="card-deck">
                        {projects.map(project => (
                            <div className="card col-12 col-md-4 p-0 text-center shadow-lg justify-content-between" key={project.id}>
                                <Link
                                    to={`/admin/projects/${project.id}`}
                                >
                                    <img src={`../images/uploads/heroImages/${project.project_image}.jpg`} className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">{project.project_name}</h5>
                                    </div>
                                </Link>
                                <div className="card-footer p-0">
                                    <Link
                                        to={`/admin/projects/edit/${project.id}`}
                                        className="btn btn-theme-color btn-block"
                                    >
                                        Edit Project
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }
}
export default Projects;
