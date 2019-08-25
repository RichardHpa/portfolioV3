import React, { Component } from 'react';
import Loader from '../Loader';
import axios from 'axios'
import MediaModal from './MediaModal';
import FormData from 'form-data';

class Media extends Component {
    constructor (props) {
        super(props)
        this.state = {
            media: [],
            pageLoaded: false,
            uploaderOpen: false
        }

        this.getImage = this.getImage.bind(this);
    }

    componentDidMount () {
        axios.get('/api/media').then(response => {
            this.setState({
                media: response.data,
                pageLoaded: true
            })
        })
    }

    getImage(id){
        const {media} = this.state;
        axios.get(`/api/media/${id}`).then(response => {
            media.push(response.data);
            this.setState({
                media: media
            })
        })
    }

    deleteImage(imageID){
        const {media} = this.state;
        let form = new FormData();
        form.append('id', imageID);
        axios.post('/api/media/delete', form, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
            }
        })
        .then((response) => {
            for (var i = 0; i < media.length; i++) {
                if(media[i].id === response.data){
                    media.splice(i,1);
                    this.setState({
                        media: media
                    });
                    break;
                }
            }
        }).catch((error) => {
            console.log('error');
        });
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
                            <MediaModal
                                sendImage={this.getImage}
                                btnText='Upload Image'
                                uploaderOnly='true'
                            />
                        </div>
                    </div>
                    <div className="row">
                        {
                            media.map((mediaItem, i) => (
                                <div className="col-6 col-sm-4 col-md-3 mt-2" key={i}>
                                    <img
                                        src={`../images/uploads/thumbnails/${mediaItem.media_name}.jpg`}
                                        className="img-fluid"
                                        onClick={this.deleteImage.bind(this,mediaItem.id )}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
    }
}

export default Media
