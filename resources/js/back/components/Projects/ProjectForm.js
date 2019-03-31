import React, { Component } from 'react';

class ProjectForm extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <form autoComplete="off">
                <div className="form-group">
                    <label for="projectName">Project Name</label>
                    <input
                        id='name'
                        type="text"
                        name='projectName'
                        className="form-control"
                        data-validation='required, min:10, max:20'
                        placeholder="Project Name"
                    />
                </div>
                <div className="form-group">
                    <label>Project Description</label>
                    <textarea
                        id='description'
                        className="form-control"
                        data-validation='required, min:10, max:20'
                        name='projectDescription'
                        rows='10'
                    />
                </div>
                <div class="form-row">
                    <div class="form-group col">
                        <label>Main Project Image</label>
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="customFile"/>
                            <label className="custom-file-label" for="customFile">Choose file</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-theme-color">Add New Project</button>
            </form>
        )
    }
}

export default ProjectForm;
