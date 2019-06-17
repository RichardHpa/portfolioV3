import React, { Component } from 'react';
import FormData from 'form-data';
import Loader from '../Loader';
import axios from 'axios';
import { Redirect} from 'react-router-dom';
import Modal from './Modal';


class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            src : null,
            croppedURL: null,
            sendingData: false,
            errors: {
                projectName: '',
                projectDescription: '',
                projectImage: '',
                projectBio:'',
                githubLink: '',
                siteURL: ''
            },
            projectName: '',
            projectDescription: '',
            projectBio: '',
            githubLink: '',
            siteURL: '',
            action: '',
            updatedImage: false
        }

        this.handleModalShowClick = this.handleModalShowClick.bind(this);
        this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
        this.handleCroppedImage = this.handleCroppedImage.bind(this);
        this.validation = this.validation.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this);
        this.removeImage = this.removeImage.bind(this);
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
        this.setState({
            action: this.props.action
        });
    }

    resetValue(e){
        e.target.value = null;
    }

    validation(event){
        var input = event.target.name;
        var fieldValue = event.target.value;
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                [input]: ''
            }
        }))
        var validationRules = event.target.dataset.validation;
        var clearString = validationRules.replace(/ /g,'');
        var rulesList = clearString.split(',');
        for (var i = 0; i < rulesList.length; i++) {
            var rule = rulesList[i]
            if(rule.includes(":")){
                rule = rule.split(':');
                var value = rule[1];
                rule = rule[0];
            }
            switch(rule){
                case 'required':
                    if(!fieldValue){
                        this.setState(prevState => ({
                            errors: {
                                ...prevState.errors,
                                [input]: 'This field is required'
                            }
                        }))
                        return;
                    }
                break;
                case 'min':
                    if(fieldValue.length < value){
                        this.setState(prevState => ({
                            errors: {
                                ...prevState.errors,
                                [input]: 'This field needs to be at least ' + value + ' characters'
                            }
                        }))
                        return;
                    }
                break;
                case 'max':
                    if(fieldValue.length > value){
                        this.setState(prevState => ({
                            errors: {
                                ...prevState.errors,
                                [input]: 'This field can be no more than ' + value + ' characters'
                            }
                        }))
                        return;
                    }
                break;
            }
        }
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
            src: null,
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
        const { action, error } = this.state;
        const { history } = this.props
        if(this.state.projectName && this.state.projectDescription && this.state.croppedURL){
            this.setState({
                sendingData: true
            });
            var reader = new FileReader();
            var myblob = new Blob([this.state.croppedURL], {
                type: 'image/jpeg'
            });
            reader.onloadend = () => {
              var base64data = reader.result;
            }
            reader.readAsDataURL(myblob);
            let form = new FormData();
            if(this.props.action === '/api/projects/edit'){
                form.append('project_id', this.props.project['id'])
            }
            form.append('project_name', this.state.projectName);
            form.append('project_description', this.state.projectDescription);
            form.append('project_bio', this.state.projectBio);
            form.append('project_github', this.state.githubLink);
            form.append('project_link', this.state.siteURL);
            if(this.state.updatedImage === true){
                form.append('updateImage', true);
            }
            form.append('file', this.state.croppedURL);
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


    render(){
        const {showModal, src, errors, croppedURL, sendingData}  = this.state;
        return(
            <form autoComplete="off" onSubmit={this.handleCreateNewProject}>
                <div className="row">
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
                    </div>
                    <div className="col12 col-md-4">
                        <div className="card h-100 p-2 justify-content-between">
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
                                            <button className="btn btn-theme-color mt-1" onClick={this.removeImage}>Remove Image</button>
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
