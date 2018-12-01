import React, { Component } from 'react'
import { Image, Transformation } from 'cloudinary-react';
import Loader from '../Loader';
import axios from 'axios'
import request from 'superagent';

class ProjectForm extends Component {
    constructor(props) {
        super(props);

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)

        this.state = {
            sendingData: false,
            fileInputLabel: 'Upload New Image',
            projectName: '',
            projectDescription: '',
            projectImage: null,
            deleteingImage: '',
            action: ''
        };
    }

    componentDidMount () {
        const { history } = this.props
        this.setState({
            projectName: this.props.projectName,
            projectDescription: this.props.projectDescription,
            projectImage: this.props.projectImage,
            action: this.props.action
        });
    }

    resetValue(e){
        e.target.value = null;
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onPhotoSelected(files){
        this.setState({
            files: files,
            fileInputLabel: files[0].name
        })
    }

    hasErrorFor (field) {
      return !!this.state.errors[field]
    }

    handleCreateNewProject(e){
        const { action } = this.state;
        e.preventDefault();
        this.setState({
            sendingData: true
        });
        const project = {
          project_name: this.state.projectName,
          project_description: this.state.projectDescription
      }
      // if Edit
      // const imageObj = {
      //   project_image: 'portfolio/projects/'+image
      // }
      // console.log(imageObj);
      // axios
      //   .post('/api/imageDelete', imageObj)
      //   .then(response => {
      //       this.setState({
      //           projectImage: null
      //       })
      //   })
      //   .catch(error => {
      //     this.setState({
      //       errors: error.response.data.errors
      //     })
      //   })
        axios
          .post(action, project)
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
        const { history } = this.props
        this.setState({
            sendingData: false
        })
        history.push('/admin/projects')
    }

    handleDeleteImage(image){
        event.preventDefault();
        this.setState({
            projectImage: null,
            deleteingImage: image
        })
    }

    render () {
        const { sendingData, fileInputLabel, projectName, projectDescription, projectImage } = this.state;
        return (
            <div>
                <form onSubmit={this.handleCreateNewProject} autoComplete="off" >
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Project Name</label>
                                <input
                                  id='name'
                                  type='text'
                                  className={`form-control`}
                                  name='projectName'
                                  value={projectName}
                                  placeholder="Project Name"
                                  onChange={this.handleFieldChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Project Description</label>
                                <textarea
                                  id='description'
                                  className={`form-control`}
                                  name='projectDescription'
                                  rows='10'
                                  value={projectDescription}
                                  onChange={this.handleFieldChange}
                                />
                            </div>
                            <div className="form-row">

                            {projectImage ? (
                                <div className="col">
                                    <Image
                                        cloudName={process.env.MIX_CLOUD_NAME}
                                        publicId={"portfolio/projects/" + projectImage}
                                        className="img-fluid"
                                        dpr="auto"
                                        responsive
                                        width="auto"
                                        crop="scale"
                                    >
                                    </Image>
                                    <button className="btn btn-danger" onClick={this.handleDeleteImage.bind(this, projectImage)}>Delete Image</button>
                                </div>
                            ):(
                                <div className="col form-group">
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
                                        <label className="custom-file-label">{fileInputLabel}</label>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <input type="submit" className="btn btn-theme-color" value={this.props.inputLabel}/>
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

export default ProjectForm
