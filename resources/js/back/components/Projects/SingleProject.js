import React, { Component } from 'react'
import axios from 'axios';
import ProjectForm from './ProjectForm';
import Loader from '../Loader';
import FormData from 'form-data';
import { Link } from 'react-router-dom';

class SingleProject extends Component {
    constructor (props) {
        super(props);
        this.state = {
            project: {},
            pageLoaded: false,
            sendingData: false
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount () {
      const projectId = this.props.match.params.id
      axios.get(`/api/projects/${projectId}`).then(response => {
        this.setState({
          project: response.data,
          pageLoaded: true
        })
      })
    }

    handleDelete(){
        this.setState({
            sendingData: true
        });
        const { history } = this.props
        let form = new FormData();
        form.append('id', this.state.project['id']);
        console.log(form);

        axios.post('/api/projects/delete', form, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
            }
        })
        .then((response) => {
            console.log(response);
            if(response['data'] === 'success'){
                this.setState({
                    pageLoaded: false
                });
                history.push('/admin/projects');
            }
        }).catch((error) => {
            console.log('error');
        });
    }

    render () {
        const { project, sendingData } = this.state
        const {pageLoaded} = this.state
        const { history } = this.props
        if (!pageLoaded) {
            return (
                <Loader />
            )
        } else {
            return (
                <div className="container ml-0">
                    <div className="row justify-content-between">
                        <div className="col-9">
                            <h1>{project.project_name}</h1>
                        </div>
                        <div className="col">
                            <Link
                                to={`/admin/projects/edit/${project.id}`}
                                className='btn btn-theme-color ml-2'
                            >
                                Edit Project
                            </Link>
                            <button onClick={this.handleDelete} className="btn btn-theme-color ml-2">Delete Project</button>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-sm-6 text-center">
                            <img src={`/images/uploads/heroImages/${project.project_image}.jpg`} className="img-fluid"/>
                        </div>
                        <div className="col content">
                            {project.project_bio}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col content">
                            {project.project_description}
                        </div>
                    </div>
                    {sendingData ? (<Loader
                        />
                    ):null}
                </div>
            )
        }

    }
}

export default SingleProject
