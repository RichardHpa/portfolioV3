import React, { Component } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class Test extends Component {
    constructor(props) {
        super(props);

        this.onSelectFile = this.onSelectFile.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.getCroppedImg = this.getCroppedImg.bind(this);


        this.state = {
            src: null,
            crop: {
                x: 10,
                y: 10,
                aspect: 1,
                width: 50,
            },
        };
    }

    onSelectFile(e){
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener('load', () =>
            this.setState({ src: reader.result }),
          );
          reader.readAsDataURL(e.target.files[0]);
        }
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

    onCropComplete(crop, pixelCrop){
        this.makeClientCrop(crop, pixelCrop);
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

    render () {
        const { croppedImageUrl } = this.state;
        console.log(croppedImageUrl);
        return (
            <div className="container ml-0">
                <div className="row">
                    <div className="col">
                        <h1>Test</h1>
                        <hr/>
                        <input type="file" onChange={this.onSelectFile} />
                        {this.state.src && (
                          <ReactCrop
                            src={this.state.src}
                            crop={this.state.crop}
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                          />
                        )}
                        {croppedImageUrl && <img alt="Crop" className="img-fluid" src={croppedImageUrl} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default Test
