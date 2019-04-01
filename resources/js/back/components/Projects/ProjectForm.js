import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import FormData from 'form-data';
import Loader from '../Loader';
import axios from 'axios';

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
                projectImage: ''
            },
            projectName: '',
            projectDescription: '',
            projectImage: null,
            action: ''
        }

        this.handleModalShowClick = this.handleModalShowClick.bind(this);
        this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
        this.handleCroppedImage = this.handleCroppedImage.bind(this);
        this.validation = this.validation.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this);
    }

    componentDidMount () {
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
        this.setState(prevState => ({
            croppedURL: croppedImageURL,
            errors: {
                ...prevState.errors,
                projectImage: ''
            }
        }))
        this.handleModalCloseClick();
    }

    handleCreateNewProject(e){
        e.preventDefault();
        const { action, history, error } = this.state;
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

            form.append('project_name', this.state.projectName);
            form.append('project_description', this.state.projectDescription);
            form.append('file', this.state.croppedURL);
            axios.post(action, form, {
                headers: {
                  'accept': 'application/json',
                  'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                }
            })
            .then((response) => {
                console.log(response['data']);
                if(response['data'] === 'success'){
                    this.setState({
                        sendingData: false
                    });
                    history.push('/admin/projects')

                }
            }).catch((error) => {
                console.log("error");
            });
        } else {
            console.log("error");
        }
    }


    render(){
        const {showModal, src, errors, croppedURL, sendingData}  = this.state;
        return(
            <form autoComplete="off" onSubmit={this.handleCreateNewProject}>
                <div className="form-group">
                    <label htmlFor="projectName">Project Name</label>
                    <input
                        id='name'
                        type="text"
                        name='projectName'
                        className={"form-control " + (errors.projectName ? 'is-invalid' : '')}
                        data-validation='required, min:10, max:100'
                        placeholder="Project Name"
                        onChange={this.handleFieldChange}
                        onBlur={this.validation}
                    />
                    {errors.projectName ? (<div className="invalid-feedback">
                        {errors.projectName}
                    </div>):null}
                </div>
                <div className="form-group">
                    <label>Project Description</label>
                    <textarea
                        id='description'
                        className={"form-control " + (errors.projectDescription ? 'is-invalid' : '')}
                        data-validation='required, min:10'
                        name='projectDescription'
                        rows='10'
                        onChange={this.handleFieldChange}
                        onBlur={this.validation}
                    />
                    {errors.projectDescription ? (<div className="invalid-feedback">
                        {errors.projectDescription}
                    </div>):null}
                </div>
                <div className="form-row">
                    <div className="form-group col">
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
                        <div className="col">
                            <img alt="Crop" className="img-fluid" src={croppedURL} />
                        </div>
                    }
                </div>
                <button type="submit" className="btn btn-theme-color">Add New Project</button>
                {sendingData ? (<Loader
                    />
                ):null}
            </form>

        )
    }
}

export default ProjectForm;

class Modal extends Component {
    constructor(props){
        super(props);

        this.state = {
            crop: {
                x: 20,
                y: 10,
                width: 40,
                height: 40
            }
        }

        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.cropImage = this.cropImage.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
    }

    componentDidMount(e){
        const { handleModalCloseClick } = this.props;
        $(this.modal).modal({show: true, backdrop: 'static', keyboard: false})
        $(this.modal).on('hidden.bs.modal', handleModalCloseClick);
    }

    handleCloseClick(){
        $(this.modal).modal('hide');
        this.props.handleModalCloseClick();
    }

    onCropChange(crop){
        this.setState({ crop });
    }

    cropImage(){
        const { croppedImageUrl } = this.state;
        $(this.modal).modal('hide');
        this.props.croppedImage(croppedImageUrl);
    }

    onCropComplete(crop, pixelCrop){
        this.makeClientCrop(crop, pixelCrop);
    }

    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg',
            );
            this.setState({ croppedImageUrl });
        }
    }

    onImageLoaded(image, pixelCrop){
        this.imageRef = image;
        const { crop } = this.state;
        if (crop.aspect && crop.height && crop.width) {
          this.setState({
            crop: { ...crop, height: null },
          });
        } else {
          this.makeClientCrop(crop, pixelCrop);
        }
    }

    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        );

        return new Promise((resolve, reject) => {
            resolve(canvas.toDataURL());
        });
    }

    render(){
        return(
             <div className="modal fade" ref={modal => this.modal = modal} id="exampleModalLong" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <ReactCrop
                                src={this.props.originalImgURL}
                                crop={this.state.crop}
                                onChange={this.onCropChange}
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                              />
                        </div>

                        <div className="modal-footer">
                           <button type="button" className="btn btn-secondary" onClick={this.handleCloseClick}>Cancel Cropping</button>
                           <button type="button" className="btn btn-theme-color" onClick={this.cropImage}>Save Crop</button>
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}
