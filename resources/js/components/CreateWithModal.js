import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios'

class ProjectsCreate extends Component {
    constructor(props) {
        super(props);

        this.handleModalShowClick = this.handleModalShowClick.bind(this);
        this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
        this.handleCroppedImage = this.handleCroppedImage.bind(this);
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)

        this.state = {
            showModal: false,
            src : null,
            croppedURL: null,
            name: 'test',
            description: 'test',
            errors: []
        }
    }


    handleModalShowClick(e){
        e.preventDefault();
        if(window.FileReader){
            const imageType = /^image\//;
            let file = e.target.files[0], reader = new FileReader(), self = this;
            if (!file || !imageType.test(file.type)) {
                console.log("no file uploaded/supported")
                return;
            }
            reader.onload = function(r){
                self.setState({
                    src: r.target.result,
                    showModal: true
                });
            }
            reader.readAsDataURL(file);
        }
    }

    handleModalCloseClick(){
        this.setState({
            src: null,
            showModal: false
        })
    }

    handleCroppedImage(croppedImageURL){
        this.setState({
            croppedURL: croppedImageURL
        })
        this.handleModalCloseClick();
    }

    resetValue(e){
        e.target.value = null;
    }

    handleCreateNewProject(e){
        e.preventDefault();
        const { history } = this.props;
    }

    uploadWidget() {
        cloudinary.openUploadWidget({ cloud_name: 'ddidg3xo5', upload_preset: 'fx4d03sy'},
        function(error, result) {
            console.log(result);
        });
    }
    render () {
        const {showModal} = this.state;
        const { src } = this.state;
        const { croppedURL } = this.state;
        return (
            <div className="container ml-0">
                <div className="row">
                    <div className="col">
                        <h1>Projects Create Page</h1>
                        <button onClick={this.uploadWidget.bind(this)} className="upload-button">
        Add Image
    </button>
                        <hr/>
                    </div>
                </div>


                <form onSubmit={this.handleCreateNewProject}>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Project Name</label>
                                <input type="text" className="form-control" placeholder="Project Name" name="project_name"/>
                            </div>
                            <div className="form-group">
                                <label>Project Description</label>
                                <textarea className="form-control" name="project_description"></textarea>
                            </div>
                            <div className="form-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="customFile" accept="image/*" onClick={this.resetValue} onChange={this.handleModalShowClick}/>
                                    <input type="hidden" name="coppedImage" value={this.state.cropped}/>
                                    <label className="custom-file-label">Choose file</label>
                                    {showModal ? (<Modal
                                        handleModalCloseClick={this.handleModalCloseClick}
                                        originalImgURL={src}
                                        croppedImage={this.handleCroppedImage}
                                        />
                                    ):null}
                                </div>
                            </div>

                            {croppedURL && <div className="mb-5"><img alt="Crop" className="img-fluid" src={croppedURL} /></div>}


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
            </div>
        )
    }
}


export default ProjectsCreate
