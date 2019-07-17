import React, { Component } from 'react';
import Loader from '../Loader';
import axios from 'axios'
import Uploader from './Uploader';
import FormData from 'form-data';

class Media extends Component {
    constructor (props) {
        super(props)
        this.state = {
            media: [],
            pageLoaded: false,
            uploaderOpen: false
        }
        this.openMedia = this.openMedia.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
    }

    componentDidMount () {
        axios.get('/api/media').then(response => {
            this.setState({
                media: response.data,
                pageLoaded: true
            })
            console.log(this.state.media);
        })
    }

    openMedia(e){
        e.preventDefault();
        this.setState({
            uploaderOpen: true
        })
    }

    closeUploader(image){
        const {media} = this.state;
        console.log(image);
        if(image){
            media.push(image.mediaInfo);
            this.setState({
                media: media
            })
        }
        this.setState({
            uploaderOpen: false
        })
    }

    render () {
        const {media, uploaderOpen, pageLoaded} = this.state;
        if (!pageLoaded) {
            return (
                <Loader />
            )
        } else {
        return (
                <div className="container ml-0 h-100">
                    <div className="row">
                        <div className="col">
                        <h1>Media</h1>
                        <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-theme-color" onClick={this.openMedia}>Upload Image</button>
                        </div>
                    </div>
                    <div className="row">
                        {
                            media.map((mediaItem, i) => (
                                <div className="col-6 col-sm-4 col-md-3 mt-2" key={i}>
                                    <img src={`../images/uploads/thumbnails/${mediaItem.media_name}.jpg`} className="img-fluid"/>
                                </div>
                            ))
                        }
                    </div>
                    {
                        uploaderOpen? <Uploader closeUploader={this.closeUploader}/> : ''
                    }
                </div>
            )
        }
    }
}

export default Media
