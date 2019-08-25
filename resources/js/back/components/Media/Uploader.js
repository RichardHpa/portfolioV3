import React, {Component, useCallback} from 'react'
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

import {image64toCanvasRef, downloadBase64File, extractImageFileExtensionFromBase64, base64StringtoFile} from './ReusableUtils.js';

const imageMaxSize = 1000000000;
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';

class Uploader extends Component {
    constructor (props) {
        super(props);
        this.state = {
            hovering: false,
            imgSrc: null,
            croppedURL: null,
            crop: {
                x: 20,
                y: 10,
                width: 40,
                height: 40
            }
        }

        this.handleDrop = this.handleDrop.bind(this);
        this.hover = this.hover.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.cropImage = this.cropImage.bind(this);
    }

    verifyFile(files){
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypes.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    handleDrop(files, rejectedFiles){
        if (rejectedFiles && rejectedFiles.length > 0){
            this.verifyFile(rejectedFiles)
        }

        if (files && files.length > 0){
             const isVerified = this.verifyFile(files)
              if (isVerified){
                  const currentFile = files[0]
                 const myFileItemReader = new FileReader()
                 myFileItemReader.addEventListener("load", ()=>{
                     const myResult = myFileItemReader.result
                     this.setState({
                         imgSrc: myResult,
                         imgSrcExt: extractImageFileExtensionFromBase64(myResult)
                     })
                 }, false)

                 myFileItemReader.readAsDataURL(currentFile)
              }
         }
    }

    hover(){
        this.setState({
            hovering: true
        })
    }

    handleDragLeave(){
        this.setState({
            hovering: false
        })
    }

    onCropChange(crop){
        this.setState({ crop });
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

    onCropComplete(crop, pixelCrop){
        this.makeClientCrop(crop, pixelCrop);
    }

    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedURL = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg',
            );
            this.setState({ croppedURL });
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

    cropImage(e){
        e.preventDefault();
        const {croppedURL, imgSrc} = this.state;
        let form = new FormData();
        const extention = extractImageFileExtensionFromBase64(imgSrc);
        const fileName = "previewFile"+ extention;
        const newCroppedFile = base64StringtoFile(croppedURL, fileName);
        form.append('file', newCroppedFile);
        axios.post('/api/media', form, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            }
        })
        .then((response) => {
            this.props.selectImage(response.data.mediaInfo.id);
        });
    }

    render () {
        const {imgSrc, hovering, croppedURL} = this.state;
        return (
            <div className="container-fluid">
                {imgSrc !== null?
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-9 text-center">
                                <ReactCrop
                                    src={imgSrc}
                                    crop={this.state.crop}
                                    onChange={this.onCropChange}
                                    onImageLoaded={this.onImageLoaded}
                                    onComplete={this.onCropComplete}
                                  />
                            </div>
                            <div className="col-12 col-md-3">
                                <div className="card bg-light p-3 h-100">
                                    <p className="text-left d-none d-md-block">Preview Image</p>
                                    <img src={croppedURL} className="img-fluid w-100 d-none d-md-block" alt="preview crop"/>
                                    <button className="btn btn-theme-color btn-block mt-3" onClick={this.cropImage}>Crop Image</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Dropzone
                        onDrop={this.handleDrop}
                        accept={acceptedFileTypes}
                        multiple={false}
                        maxSize={imageMaxSize}
                        onDragOver={this.hover}
                        onDragLeave={this.handleDragLeave}
                    >
                        {({getRootProps, getInputProps}) => (
                            <section id="dropzoneSection">
                                <div id="dropzone" {...getRootProps()} className={hovering? 'hovering': ''}>
                                    <input {...getInputProps()} />
                                    <button className="btn btn-theme-color">Drag 'n' drop some files here, or click to select files</button>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                }
            </div>
        )
    }
}

export default Uploader;
