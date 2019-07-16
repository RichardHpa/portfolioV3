import React, { Component } from 'react';

import Uploader from './Uploader';

class Media extends Component {
    constructor (props) {
        super(props)
        this.state = {
            uploaderOpen: false
        }
        this.openMedia = this.openMedia.bind(this);
    }

    openMedia(e){
        e.preventDefault();
        this.setState({
            uploaderOpen: true
        })
    }

    render () {
        const {uploaderOpen} = this.state;
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
                {
                    uploaderOpen? <Uploader/> : ''
                }
            </div>
        )
    }
}

export default Media
