import React, { Component } from 'react';
import ProjectForm from './ProjectForm';

class ProjectsCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            errors: []
        };
    }
    render () {
        const { history } = this.props
        const { sendingData, fileInputLabel } = this.state;
        return (
            <div className="container-fluid ml-0">
                <div className="row">
                    <div className="col">
                        <h1>Create a new project</h1>
                        <hr/>
                    </div>
                </div>
                <ProjectForm
                    action="/api/projects"
                    projectName=""
                    inputLabel="Add New Project"
                    history={history}
                />
            </div>
        )
    }
}

export default ProjectsCreate
