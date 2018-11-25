import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class ProjectsCreate extends Component {
    constructor(props) {
        super(props);

        this.handleModalShowClick = this.handleModalShowClick.bind(this);
        this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
        this.handleCroppedImage = this.handleCroppedImage.bind(this);

        this.state = {
            showModal: false,
            src : null,
            croppedURL: null
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

    render () {
        const {showModal} = this.state;
        const { src } = this.state;
        const { croppedURL } = this.state;
        console.log(croppedURL);
        return (
            <div className="container ml-0">
                <div className="row">
                    <div className="col">
                        <h1>Projects Create Page</h1>

                        <hr/>
                    </div>
                </div>
                <form>
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
                                    <input type="file" className="custom-file-input" id="customFile" onClick={this.resetValue} onChange={this.handleModalShowClick}/>
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
        canvas.toBlob(blob => {
          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
        }, 'image/jpeg');
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

export default ProjectsCreate
