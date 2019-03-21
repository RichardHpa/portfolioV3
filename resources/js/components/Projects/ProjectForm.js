import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import FormData from 'form-data'
import Loader from '../Loader';
import axios from 'axios'

class ProjectForm extends Component {
    constructor(props) {
        super(props);

        this.handleModalShowClick = this.handleModalShowClick.bind(this);
        this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
        this.handleCroppedImage = this.handleCroppedImage.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this);
        this.handleDeleteProject = this.handleDeleteProject.bind(this);
        this.validation = this.validation.bind(this);

        this.state = {
            editProject: false,
            showModal: false,
            src : null,
            croppedURL: null,
            sendingData: false,
            fileInputLabel: 'Upload New Image',
            projectID: 0,
            projectName: '',
            projectDescription: '',
            projectImage: null,
            deleteingImage: '',
            errors: {
                projectName: '',
                projectDescription: '',
                projectImage: ''
            },
            action: ''
        };
    }

    componentDidMount () {
        if(this.props.inputLabel == 'Edit Project'){
            this.setState({
                editProject: true
            })
        } else{
            // this.setState({
            //     errors: {
            //         name: 'Must include a Name',
            //         description: 'Must include a Description',
            //         image: 'Must include an image'
            //     }
            // })
        }
        this.setState({
            projectID: this.props.id,
            projectName: this.props.projectName,
            projectDescription: this.props.projectDescription,
            projectImage: this.props.projectImage,
            action: this.props.action
        });
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

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
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
                    }
                break;
            }
        }
    }

    handleDeleteProject(e){
        const { history } = this.props
        e.preventDefault();
        this.setState({
            sendingData: true
        });
        let form = new FormData();
        form.append('id', this.state.projectID);
        axios.post('/api/projects/delete', form, {

        })
        .then((response) => {
            if(response.data === 'success'){
                this.setState({
                    sendingData: false
                });
                history.push('/admin/projects')
            }
        }).catch((error) => {
            console.log("error");
        });

    }

    handleCreateNewProject(e){
        e.preventDefault();
        console.log(this.state.errors);
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

            form.append('file', this.state.croppedURL);
            form.append('project_name', this.state.projectName);
            form.append('project_description', this.state.projectDescription);
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

    render () {
        const { errors, croppedURL, src, showModal, sendingData, fileInputLabel, projectName, projectDescription, projectImage , editProject} = this.state;
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
                                  className={"form-control " + (errors.projectName ? 'is-invalid' : '')}
                                  name='projectName'
                                  value={projectName}
                                  data-validation='required, min:10, max:20'
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
                                  data-validation='required, min:10, max:20'
                                  name='projectDescription'
                                  rows='10'
                                  value={projectDescription}
                                  onChange={this.handleFieldChange}
                                  onBlur={this.validation}
                                />
                                {errors.projectDescription ? (<div className="invalid-feedback">
                                    {errors.projectDescription}
                                </div>):null}
                            </div>
                            <div className="form-group">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className={"custom-file-input " + (errors.projectImage ? 'is-invalid' : '')}
                                        id="customFile"
                                        onClick={this.resetValue}
                                        onChange={this.handleModalShowClick}
                                    />
                                    {errors.projectImage ? (<div className="invalid-feedback">
                                        {errors.projectImage}
                                    </div>):null}
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
                                <input type="submit" className="btn btn-theme-color" value={this.props.inputLabel}/>
                            </div>
                        </div>
                    </div>
                </form>
                {editProject &&
                <div className="row">
                    <div className="col">
                        <form onSubmit={this.handleDeleteProject}>
                            <div className="form-group">
                                <input type="hidden"  value={this.state.projectID} />
                                <input type="submit" className="btn btn-theme-color" value="Remove Project"/>
                            </div>
                        </form>
                    </div>
                </div>
                }
                {sendingData ? (<Loader
                    />
                ):null}
            </div>
        )
    }
}








class Modal extends Component {
    constructor(props){
        super(props)

        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.cropImage = this.cropImage.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);

        this.state = {
          crop: {
            x: 20,
            y: 10,
            width: 40,
            height: 40,
          }
        }
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

    cropImage(){
        const { croppedImageUrl } = this.state;
        $(this.modal).modal('hide');
        this.props.croppedImage(croppedImageUrl);
    }

    onImageLoaded(image, pixelCrop){
        this.imageRef = image;
        // Make the library regenerate aspect crops if loading new images.
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

    onCropComplete(crop, pixelCrop){
        this.makeClientCrop(crop, pixelCrop);
    }

    render(){
        return (
            <div>
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
            </div>
        )
    }
}

export default ProjectForm
