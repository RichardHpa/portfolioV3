import React, {Component, useCallback} from 'react'
import axios from 'axios';
import Uploader from './Uploader';

class MediaModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            media: [],
            uploader: false
        }
        this.closeUploader = this.closeUploader.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
        this.handleSelectImage = this.handleSelectImage.bind(this);

    }

    componentDidMount () {
        axios.get('/api/media').then(response => {
            this.setState({
                media: response.data
            })
        })
    }

    closeUploader(){
        this.props.closeUploader();
    }

    toggleUploader(e){
        e.preventDefault();
        this.setState(prevState => ({
          uploader: !prevState.uploader
        }));
    }

    handleSelectImage(id){
        this.props.sendImage(id);
    }

    render () {
        const {media, uploader} = this.state;
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
        )
    }
}

export default MediaModal;
