import React, { Component } from 'react';
import axios from 'axios'
import request from 'superagent';
import Loader from '../Loader';

class ProjectsCreate extends Component {
    constructor(props) {
        super(props);

        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)

        this.state = {
            files: [],
            errors: [],
            sendingData: false,
            project_name: '',
            project_description: ''

        };
        this.photoId = 1;
    }


    resetValue(e){
        e.target.value = null;
    }

    onPhotoSelected(files){
        console.log(files);
        this.setState({
            files: files
        })

    }

    hasErrorFor (field) {
      return !!this.state.errors[field]
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateNewProject(e){
        e.preventDefault();
        this.setState({
            sendingData: true
        });
        const project = {
          project_name: this.state.project_name,
          project_description: this.state.project_description
        }
        axios
          .post('/api/projects', project)
          .then(response => {
              const fileName = response.data['image_name'];
              let {files} = this.state;
              const url = `https://api.cloudinary.com/v1_1/${process.env.MIX_CLOUD_NAME}/upload`;
              for (let file of files) {
                const photoId = this.photoId++;
                request.post(url)
                    .field('public_id', fileName)
                    .field('upload_preset', process.env.MIX_UPLOAD_PRESET)
                    .field('file', file)
                    .field('multiple', false)
                    .field('context', fileName ? `photo=${fileName}` : '')
                    .end((error, response) => {
                        this.onPhotoUploaded(photoId, fileName, response);
                    });
              }
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
            })
          })


    }


    onPhotoUploaded(id, fileName, response) {
        console.log(response)
        this.setState({
            sendingData: false
        })
    }

    render () {
        const { sendingData } = this.state;
        return (
            <div className="container ml-0">
                <div className="row">
                    <div className="col">
                        <h1>Projects Create Page</h1>
                        <p></p>
                        <hr/>
                    </div>
                </div>

                <form onSubmit={this.handleCreateNewProject}>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Project Name</label>
                                <input
                                  id='name'
                                  type='text'
                                  className={`form-control ${this.hasErrorFor('project_name') ? 'is-invalid' : ''}`}
                                  name='project_name'
                                  placeholder="Project Name"
                                  value={this.state.name}
                                  onChange={this.handleFieldChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Project Description</label>
                                <textarea
                                  id='description'
                                  className={`form-control ${this.hasErrorFor('project_description') ? 'is-invalid' : ''}`}
                                  name='project_description'
                                  rows='10'
                                  value={this.state.description}
                                  onChange={this.handleFieldChange}
                                />
                            </div>
                            <div className="form-group">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        id="customFile"
                                        className="custom-file-input"
                                        accept="image/*"
                                        ref={fileInputEl =>
                                            (this.fileInputEl = fileInputEl)
                                        }
                                        onClick={this.resetValue}
                                        onChange={() =>
                                            this.onPhotoSelected(
                                                this.fileInputEl.files
                                            )
                                        }
                                    />
                                    <label className="custom-file-label">Choose file</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <input type="submit" className="btn btn-theme-color"/>
                            </div>
                        </div>
                    </div>
                </form>
                {sendingData ? (<Loader
                    />
                ):null}

            </div>
        )
    }
}


export default ProjectsCreate
