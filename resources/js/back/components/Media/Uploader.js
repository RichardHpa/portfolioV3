import React, {Component, useCallback} from 'react'
import Dropzone from 'react-dropzone'
import {image64toCanvasRef, downloadBase64File, extractImageFileExtensionFromBase64, base64StringtoFile} from './ReusableUtils.js';

const imageMaxSize = 1000000000;
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';

class Uploader extends Component {
    constructor (props) {
        super(props);
        this.state = {
            hovering: false,
            imgSrc: null
        }

        this.handleDrop = this.handleDrop.bind(this);
        this.hover = this.hover.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
    }

    verifyFile(files){
        console.log(files);
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
                     // console.log(myFileItemReader.result)
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


    render () {
        const {imgSrc, hovering} = this.state;
        return (
            <div id="uploader">
                <div className="uploaderCard">
                {imgSrc !== null?
                    <img src={imgSrc} className="img-fluid dropzoneImg" alt="cropping Image"/>
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
                            <section id="dropzone" className={hovering? 'hovering': ''}>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <button className="btn btn-theme-color">Drag 'n' drop some files here, or click to select files</button>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                }
                </div>
            </div>
        )
    }
}

export default Uploader;
