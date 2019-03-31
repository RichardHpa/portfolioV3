import React, { Component } from 'react';

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
            <div className="container ml-0">
                <div className="row">
                    <div className="col">
                        <h1>Create a new project</h1>
                        <hr/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsCreate
