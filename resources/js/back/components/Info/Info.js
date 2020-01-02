import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios'
import FormData from 'form-data';
import RhEditor  from 'rh-editor'

import Loader from '../Loader';

const testContent = "{\"blocks\":[{\"key\":\"7r7mr\",\"text\":\"This is a new test again\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}";
class Info extends Component {
    constructor () {
        super()
        this.state = {
            pageLoaded: false,
            info:{

            }
        }

        this.saveInfo = this.saveInfo.bind(this);
        this.handleRecieveHTML = this.handleRecieveHTML.bind(this);
        this.handleRecieveBlocks = this.handleRecieveBlocks.bind(this);
    }

    componentDidMount () {
        const { info } = this.state;
        axios.get('/api/info').then(response => {
            for (var i = 0; i < response.data.length; i++) {
                info[response.data[i]['info_name']] = response.data[i]['info_content'];
            }
            this.setState({
                info: info,
                pageLoaded: true
            })
        })
    }

    saveInfo(){
        event.preventDefault();
        const { info } = this.state;
        let form = new FormData();
        Object.keys(info).forEach(function (item) {
            form.append(item, JSON.stringify(info[item]));
        });
        axios.post('/api/info', form).then(response => {
            console.log(response);
        })
    }

    handleRecieveHTML(value){
        const { info } = this.state;
        console.log(value);
        info['aboutHtml'] = value;
        this.setState({
            info
        })
    }

    handleRecieveBlocks(blocks){
        const { info } = this.state;
        info['aboutBlocks'] = blocks;
        this.setState({
            info
        })
    }



    render () {
        const { projects , pageLoaded, info} = this.state;
        if (!pageLoaded) {
            return (
                <Loader />
            )
        } else {
            return (
                <div className="container ml-0">
                    <div className="row">
                        <div className="col">
                            <h1>Site Info</h1>
                            <hr/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="form-group">
                                <label>About Me Section</label>
                                <RhEditor
                                    startingBlocks={info['aboutBlocks']}
                                    recieveHtml={this.handleRecieveHTML}
                                    recieveEditorState={this.handleRecieveBlocks}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                        <button className="btn btn-theme-color mr-2" onClick={this.saveInfo}>Save</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Info;
