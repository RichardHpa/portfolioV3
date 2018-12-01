import React, { Component } from 'react'
import axios from 'axios';
import ProjectForm from './ProjectForm';
import Loader from '../Loader';

class SingleProject extends Component {
    constructor (props) {
        super(props);
        this.state = {
            project: {},
            name: '',
            description: '',
            fileInputLabel: 'Choose file',
            pageLoaded: false
        }
    }

    componentDidMount () {
      const projectId = this.props.match.params.id
      axios.get(`/api/projects/${projectId}`).then(response => {
        this.setState({
          project: response.data,
          name: response.data['project_name'],
          description: response.data['project_description'],
          pageLoaded: true
        })
      })
    }

    render () {
        const { project, name, description, fileInputLabel} = this.state
        const {pageLoaded} = this.state
        const { history } = this.props
        if (!pageLoaded) {
            return (
                <Loader />
            )
        } else {
            return (
                <div className="container ml-0">
                    <div className="row">
                        <div className="col">
                            <h1>{project.project_name}</h1>
                            <hr/>
                        </div>
                    </div>
                    <ProjectForm
                        action="/api/projects"
                        projectName={project.project_name}
                        projectDescription={project.project_description}
                        projectImage={project.project_image}
                        inputLabel="Edit Project"
                        history={history}
                    />
                </div>
            )
        }

    }
}

export default SingleProject
