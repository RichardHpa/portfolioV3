import React, { Component } from 'react';
import ProjectForm from './ProjectForm';
import Loader from '../Loader';

class EditProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            pageLoaded: false,
            sendingData: false,
            errors: []
        };
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

    render () {
        const { history } = this.props
        const { project , pageLoaded} = this.state;
        if (!pageLoaded) {
            return (
                <Loader />
            )
        } else {
            return (
                <div className="container-fluid ml-0">
                    <div className="row">
                        <div className="col">
                            <h1>Edit {project.project_name}</h1>
                            <hr/>
                        </div>
                    </div>
                    <ProjectForm
                        action="/api/projects/edit"
                        project={project}
                        inputLabel="Edit Project"
                        history={history}
                    />
                </div>
            )
        }

    }
}

export default EditProject
