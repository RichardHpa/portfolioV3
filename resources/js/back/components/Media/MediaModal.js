import React, {Component, useCallback} from 'react'
import axios from 'axios';
import Uploader from './Uploader';

class MediaModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            media: [],
            uploader: false,
            modelOpen: false
        }
        this.closeUploader = this.closeUploader.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
        this.handleSelectImage = this.handleSelectImage.bind(this);
        this.openModal = this.openModal.bind(this);

    }

    componentDidMount () {
        axios.get('/api/media').then(response => {
            this.setState({
                media: response.data
            })
        })
        if(this.props.uploaderOnly === 'true'){
            this.setState({
                uploader: true
            })
        }
    }

    closeUploader(){
        this.setState({
            modelOpen: false
        })
    }

    toggleUploader(e){
        e.preventDefault();
        this.setState(prevState => ({
          uploader: !prevState.uploader
        }));
    }

    handleSelectImage(id){
        this.setState({
            modelOpen: false
        });
        this.props.sendImage(id);
    }

    openModal(){
        this.setState({
            modelOpen: true
        })
    }

    render () {
        const {media, uploader, modelOpen} = this.state;
        let btnStyle = 'btn-theme-color';
        if(this.props.btnType === 'dashed'){
            btnStyle = 'placeholderImage';
        }

        if (!modelOpen) {
          return <button className={`btn btn-block ${btnStyle}`} onClick={this.openModal}>{this.props.btnText? this.props.btnText: 'Upload An Image'}</button>;
        } else {
          return (
              <div id="uploader">
                  <div className="uploaderCard">
                      <div className="uploaderContent d-flex flex-column">
                          <div className="uploadHeader">
                              <div className="row border-bottom pb-2">
                                  <div className="col-11">
                                      <h3>Choose an Image</h3>
                                      <button className="btn btn-theme-color" onClick={this.toggleUploader}>{uploader?'Select an Image':'Upload new Image'}</button>
                                  </div>
                                  <div className="col-1 text-right">
                                      <i className="fas fa-2x fa-times closeBtn" onClick={this.closeUploader}></i>
                                  </div>
                              </div>
                          </div>
                          <div className="uploaderBody">
                              <div className="row h-100">
                                  {
                                      uploader?
                                          <Uploader
                                              selectImage={this.handleSelectImage}
                                          />
                                      :
                                      media.map((mediaItem, i) => (
                                          <div className="col-4 col-sm-2 mt-2" key={i}>
                                              <img
                                                  src={`/images/uploads/thumbnails/${mediaItem.media_name}.jpg`}
                                                  className="img-fluid thumbImg"
                                                  onClick={this.handleSelectImage.bind(this, mediaItem.id)}
                                              />
                                          </div>
                                      ))
                                  }
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          );
        }

    }
}

export default MediaModal;
