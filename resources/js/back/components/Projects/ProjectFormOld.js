import React, { Component } from 'react';
import 'babel-polyfill';
import { Editor, EditorState } from 'draft-js';
import FormData from 'form-data';
import Loader from '../Loader';
import Uploader from '../Media/Uploader';
import axios from 'axios';
import { Redirect} from 'react-router-dom';
import Modal from './Modal';
import {image64toCanvasRef, downloadBase64File, extractImageFileExtensionFromBase64, base64StringtoFile} from './ReusableUtils.js';

import {validate} from './validationUtil.js';

class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            src : null,
            croppedURL: null,
            sendingData: false,
            errors: {},
            projectName: '',
            projectDescription: '',
            projectBio: '',
            githubLink: '',
            siteURL: '',
            action: '',
            updatedImage: false,
            sectionNum: 2,
            ready: false
        }

        this.handleModalShowClick = this.handleModalShowClick.bind(this);
        this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
        this.handleCroppedImage = this.handleCroppedImage.bind(this);
        this.validation = this.validation.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.addSection = this.addSection.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount () {
        if(this.props.action === '/api/projects/edit'){
            let siteURLVar;
            if(this.props.project['website_url'] !== null){
                siteURLVar = this.props.project['website_url'];
            } else {
                siteURLVar = '';
            }

            var githubUrlVar;
            if(this.props.project['github_link'] !== null){
                githubUrlVar = this.props.project['github_link'];
            } else {
                githubUrlVar = '';
            }

            this.setState({
                projectName: this.props.project['project_name'],
                projectDescription: this.props.project['project_description'],
                projectBio: this.props.project['project_bio'],
                croppedURL: `/images/uploads/heroImages/${this.props.project['project_image']}.jpg`,
                siteURL: siteURLVar,
                githubLink: githubUrlVar
            });
        }
        var editors = [];
        for (var i = 0; i < this.state.sectionNum; i++) {
            editors.push({
                editor: 'editor'+i,
                eState: EditorState.createEmpty()
            })
        }
        this.setState({
            action: this.props.action,
            editors: editors,
            ready: true
        });
    }

    onChange(x, editorState){
        var {editors} = this.state;
        editors[x].eState = editorState;
        this.setState({
            editors: editors
        })
    }

    resetValue(e){
        e.target.value = null;
    }

    validation(event){
        var {errors} = this.state;
        var input = event.target.name;
        var checkValidation = validate(event.target.value, event.target.dataset.validation);
        if(checkValidation !== 'valid'){
            errors[input] = checkValidation
        } else {
            delete errors[input]
        }
        this.setState({
            errors: errors
        })
    }

    handleFieldChange (event) {
        var text = event.target.value.replace(/\r?\n/g, '<br />');
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleModalShowClick(e){
        e.preventDefault();
        if(window.FileReader){
            const imageType = /^image\//;
            let file = e.target.files[0], reader = new FileReader(), self = this;
            if (!file || !imageType.test(file.type)) {
                this.setState(prevState => ({
                    croppedURL: null,
                    errors: {
                        ...prevState.errors,
                        projectImage: 'No file uploaded/supported'
                    }
                }))
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
            showModal: false
        })
    }

    handleCroppedImage(croppedImageURL){
        var updateImages = false;
        if(this.props.action === '/api/projects/edit'){
            updateImages = true;
        }
        this.setState(prevState => ({
            croppedURL: croppedImageURL,
            errors: {
                ...prevState.errors,
                projectImage: ''
            },
            updatedImage: updateImages
        }))
        this.handleModalCloseClick();
    }

    handleCreateNewProject(e){
        e.preventDefault();
        const { action, error, croppedURL, src} = this.state;
        const { history } = this.props
        if(this.state.projectName && this.state.projectDescription && this.state.croppedURL){
            this.setState({
                sendingData: true
            });

            let form = new FormData();
            if(src){
                const extention = extractImageFileExtensionFromBase64(src);
                const fileName = "previewFile"+ extention;
                const newCroppedFile = base64StringtoFile(croppedURL, fileName);
                form.append('file', newCroppedFile);
            }
            if(this.state.updatedImage === true){
                form.append('updateImage', true);
            }
            if(this.props.action === '/api/projects/edit'){
                form.append('project_id', this.props.project['id'])
            }
            form.append('project_name', this.state.projectName);
            form.append('project_description', this.state.projectDescription);
            form.append('project_bio', this.state.projectBio);
            form.append('project_github', this.state.githubLink);
            form.append('project_link', this.state.siteURL);

            axios.post(action, form, {
                headers: {
                  'accept': 'application/json',
                  'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                }
            })
            .then((response) => {
                console.log(response)
                if(response['data']['message'] === 'success'){
                    this.setState({
                        sendingData: false
                    });
                    history.push('/admin/projects');
                }
            }).catch((error) => {
                console.log('error');
            });
        } else {
            console.log('error');
        }
    }

    removeImage(e){
        e.preventDefault();
        this.setState({
            croppedURL: null
        })
    }

    addSection(e){
        e.preventDefault();
        const {editors} = this.state;
        editors.push({
             editor: editors.length,
              eState: EditorState.createEmpty()
        });
        this.setState({
            sectionNum: this.state.sectionNum + 1,
            editors: editors
        })
    }

    render(){
        const {showModal, src, errors, croppedURL, sendingData, sectionNum, ready}  = this.state;
        return(
            <form autoComplete="off" onSubmit={this.handleCreateNewProject}>
                <div className="form-row">
                    <div className="col12 col-md-8 h-100 p-2 justify-content-between">
                        <div className="form-group">
                            <label htmlFor="projectName">Project Name</label>
                            <input
                                id='name'
                                type="text"
                                name='projectName'
                                className={"form-control " + (errors.projectName ? 'is-invalid' : '')}
                                data-validation='required, min:5, max:100'
                                placeholder="Project Name"
                                onChange={this.handleFieldChange}
                                onBlur={this.validation}
                                value={this.state.projectName}
                            />
                            {errors.projectName ? (<div className="invalid-feedback">
                                {errors.projectName}
                            </div>):null}
                        </div>
                        <div className="form-group">
                            <label>Project Bio</label>
                            <textarea
                                id='bio'
                                className={"form-control " + (errors.projectBio ? 'is-invalid' : '')}
                                data-validation='required, min:10'
                                name='projectBio'
                                rows='5'
                                onChange={this.handleFieldChange}
                                onBlur={this.validation}
                                value={this.state.projectBio}
                            />
                            {errors.projectBio ? (<div className="invalid-feedback">
                                {errors.projectBio}
                            </div>):null}
                        </div>
                        <div className="form-group mb-0">
                            <label>Project Description</label>
                            <textarea
                                id='description'
                                className={"form-control " + (errors.projectDescription ? 'is-invalid' : '')}
                                data-validation='required, min:10'
                                name='projectDescription'
                                rows='10'
                                onChange={this.handleFieldChange}
                                onBlur={this.validation}
                                value={this.state.projectDescription}
                            />
                            {errors.projectDescription ? (<div className="invalid-feedback">
                                {errors.projectDescription}
                            </div>):null}
                        </div>
                        {ready ?
                        <div className="sections">
                            {Array.from(Array(sectionNum), (e, i) => {
                                return <div className="row pt-3 sectionRow" key={i}>
                                    <div className="col-12 col-md-6 imgSection">
                                        <div className="card h-100 d-flex justify-content-center align-items-center p-2">
                                            <button className="btn btn-theme-color">Add Image {i}</button>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 textSection">
                                        <Editor
                                          editorState={this.state.editors[i].eState}
                                          onChange={this.onChange.bind(this, i)}
                                          ref={i}
                                          placeholder="Write about this section"
                                        />
                                    </div>
                                </div>
                              })}
                        </div>
                        : ''}
                        <div className="row pt-3">
                            <div className="col d-flex justify-content-center">
                                <button
                                    className="btn btn-theme-color"
                                    onClick={this.addSection}
                                >Add New Section</button>
                            </div>
                        </div>
                    </div>
                    <div className="col12 col-md-4">
                        <div className="card h-100 p-2 mb-3">
                            <div>
                                <div className="form-group">
                                    <label>Main Project Image</label>
                                    <div className="custom-file">
                                        <input
                                            id="customFile"
                                            type="file"
                                            className={"custom-file-input " + (errors.projectImage ? 'is-invalid' : '')}
                                            onClick={this.resetValue}
                                            onChange={this.handleModalShowClick}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                        {showModal ? (<Modal
                                            handleModalCloseClick={this.handleModalCloseClick}
                                            originalImgURL={src}
                                            croppedImage={this.handleCroppedImage}
                                            />
                                        ):null}
                                        {errors.projectImage ? (<div className="invalid-feedback">
                                            {errors.projectImage}
                                        </div>):null}
                                    </div>
                                </div>
                                {croppedURL &&
                                    <div className="form-group">
                                        <img alt="Crop" className="img-fluid" src={croppedURL} />
                                            <button className="btn btn-theme-color btn-block mt-1" onClick={this.removeImage}>Remove Image</button>
                                    </div>
                                }
                                <div className="form-group">
                                    <label htmlFor="githubLink">Github Link</label>
                                    <input
                                        id='githubLink'
                                        type="text"
                                        name='githubLink'
                                        className={"form-control " + (errors.githubLink ? 'is-invalid' : '')}
                                        data-validation=''
                                        placeholder="Github Link"
                                        onChange={this.handleFieldChange}
                                        onBlur={this.validation}
                                        value={this.state.githubLink}
                                    />
                                    {errors.githubLink ? (<div className="invalid-feedback">
                                        {errors.githubLink}
                                    </div>):null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="githubLink">Website URL</label>
                                    <input
                                        id='siteURL'
                                        type="text"
                                        name='siteURL'
                                        className={"form-control " + (errors.siteURL ? 'is-invalid' : '')}
                                        data-validation=''
                                        placeholder="Website URL"
                                        onChange={this.handleFieldChange}
                                        onBlur={this.validation}
                                        value={this.state.siteURL}
                                    />
                                    {errors.siteURL ? (<div className="invalid-feedback">
                                        {errors.siteURL}
                                    </div>):null}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-theme-color btn-block">{this.props.inputLabel}</button>
                        </div>
                    </div>
                </div>
                {sendingData ? (<Loader
                    />
                ):null}
            </form>

        )
    }
}

export default ProjectForm;
