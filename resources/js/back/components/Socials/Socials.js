import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import FormData from 'form-data';
import Loader from '../Loader';
import FontAwesomeSelector from './fontAwesomeSelector/FontAwesomeSelector';

class Socals extends Component {
    constructor () {
        super()
        this.state = {
            socials: [],
            pageLoaded: false,
            shuffle: false,
            shuffleIcon: 'fas fa-random',
            draggingSocial: null,
            showingTemp: false,
            currentHover: 0,
            draggingProjectMouse:{
                currentX: 0,
                currentY: 0,
            },
            removing: false,
            newSocial: '',
            iconPicker: false,
            position: null,
            editingId: ''
        }

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.createNew = this.createNew.bind(this);
        this.changeNew = this.changeNew.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.move = this.move.bind(this);
        this.checkShuffle = this.checkShuffle.bind(this);
        this.clearShuffle = this.clearShuffle.bind(this);

        this.prepareRemove = this.prepareRemove.bind(this);
        this.removeSocial = this.removeSocial.bind(this);

        this.changeFontAwesome = this.changeFontAwesome.bind(this);
        this.handleFontChange = this.handleFontChange.bind(this);
    }

    componentDidMount () {
        axios.get('/api/socials').then(response => {
            this.setState({
                socials: response.data,
                pageLoaded: true
            })
        })
    }

    edit(social, e){
        var allSocials = this.state.socials;
        for (var i = 0; i < allSocials.length; i++) {
            if(allSocials[i].social_name === social.social_name){
                allSocials[i].social_link = e.target.value
                break;
            }
        }
        this.setState({
            socials: allSocials
        })
    }

    save(){
        let form = new FormData();
        form.append('socials', JSON.stringify(this.state.socials));
        axios.post('/api/socials', form).then(response => {
            this.setState({
                socials: response.data,
                iconPicker: false
            })
        })
    }

    createNew(){
        const {socials, newSocial} = this.state;
        if(newSocial){
            var lowerValue = newSocial.toLowerCase();
            socials.push({
                social_icon: 'fab fa-'+lowerValue,
                social_link: '',
                social_name: newSocial
            });
            this.setState({
                socials: socials,
                newSocial: '',
                iconPicker: false
            })
            this.save();
        }
    }

    changeNew(e){
        this.setState({
            newSocial: e.target.value
        })
    }

    shuffle(){
        const {shuffle} = this.state;
        if(shuffle == false){
            this.setState({
                shuffle: true,
                shuffleIcon: 'fas fa-save',
                iconPicker: false
            })
        } else {
            this.setState({
                shuffle: false,
                shuffleIcon: 'fas fa-random',
                draggingSocial: null,
                iconPicker: false
            })
            document.removeEventListener('mousemove', this.move);
            let form = new FormData();
            form.append('socials', JSON.stringify(this.state.socials));
            axios.post('/api/socials/reorder', form).then(response => {
                console.log(response);
            })

        }
    }

    prepareRemove(){
        const { removing } = this.state;
        if(removing){
            this.setState({
                removing: false
            })
        } else {
            this.setState({
                removing: true
            })
        }
    }

    removeSocial(social){
        let form = new FormData();
        form.append('id', social.id);
        axios.post('/api/socials/delete', form, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
            }
        })
        .then((response) => {
            this.setState({
                socials: response.data
            })
        }).catch((error) => {
            console.log('error');
        });
    }

    startDrag(e, event){
        const {shuffle, draggingSocial, socials,showingTemp} = this.state;
        if(showingTemp === true){
            for (var i = 0; i < socials.length; i++) {
                if(socials[i].id === 0){
                    socials.splice(i, 1);
                    socials.splice(i, 0, draggingSocial);
                    this.setState({
                        draggingSocial: null,
                        draggingProjectMouse:{
                            currentX: 0,
                            currentY: 0,
                        },
                        showingTemp: false,
                        currentHover: 0
                    })
                    break;
                }
            }
            return;
        }
        if(shuffle === true){
            var k = window.event
            var input = e;
            for (var i = 0; i < socials.length; i++) {
                if(socials[i].id === input){
                    this.setState({
                        draggingSocial: socials[i],
                        showingTemp: true,
                        currentHover: -1,
                        draggingProjectMouse: {
                            currentX: k.clientX,
                            currentY: k.clientY,
                        }
                    });
                    document.addEventListener('mousemove', this.move);
                    socials.splice(i, 1, {
                        id: 0,
                        social_link: '',
                        social_icon: ''
                    });
                    break;
                }
            }
        }
    }

    move(e){
        this.setState({
            draggingProjectMouse: {
                currentX: e.clientX,
                currentY: e.clientY
            }
        })
    }

    checkShuffle(num){
        const {shuffle, socials, draggingSocial, showingTemp} = this.state;
        if(shuffle && draggingSocial){
            if(showingTemp === false){
                this.setState({
                  showingTemp: true,
                  currentHover: num
                }, () => {
                    if((socials[socials.length - 1].id === 0) && (num !== 0)){
                        socials.splice(-1,1);
                    }
                    for (var i = 0; i < socials.length; i++) {
                        if((socials[i].id === num) && (num !== 0)){
                            socials.splice(i, 0, {
                                id: 0,
                                social_link: '',
                                social_icon: ''
                            });
                            break;
                        }
                    }
                })
            }
        }
    }

    clearShuffle(num){
        const {shuffle, socials, draggingSocial, showingTemp, currentHover} = this.state;
        if(shuffle && draggingSocial){
            if((showingTemp === true) && (currentHover !== num)){
                this.setState({
                  showingTemp: false,
                  currentHover: null
              }, () => {
                  for (var i = 0; i < socials.length; i++) {
                      if(socials[i].id === 0){
                          socials.splice(i, 1);
                          break;
                      }
                  }
                  socials.push({
                      id: 0,
                      social_link: '',
                      social_icon: ''
                  })
              });
            }
            if(num === 0){
                this.setState({
                    showingTemp: false
                })
            }
        }
    }


    changeFontAwesome(social, e){
        if(this.state.shuffle === false){
            this.setState({
                iconPicker: true,
                position: e.currentTarget.getBoundingClientRect(),
                editingId: social.id
            })
        }
    }

    handleFontChange(record){
        if(record){
            const {socials} = this.state;
            var allSocials = this.state.socials;
            for (var i = 0; i < allSocials.length; i++) {
                if(allSocials[i].id === this.state.editingId){
                    allSocials[i].social_icon = record;
                    break;
                }
            }
            this.setState({
                socials: allSocials,
                iconPicker: false
            });
            this.save();
        } else {
            this.setState({
                iconPicker: false
            });
        }
    }

    render () {
        const { pageLoaded, socials, shuffle, iconPicker, removing, draggingSocial, draggingProjectMouse} = this.state;
        var draggingStyles = {
          top: draggingProjectMouse.currentY,
          left: draggingProjectMouse.currentX,
        };
        if (!pageLoaded) {
            return (
                <Loader />
            )
        } else {
            return (
                <div className="container ml-0">
                    <div className="row">
                        <div className="col">
                        <h1>Social Accounts</h1>
                        <hr/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <button className="btn btn-theme-color mr-2" onClick={this.save}>Save</button>
                            <button className="btn btn-theme-color mr-2" onClick={this.shuffle}><i className={this.state.shuffleIcon}></i></button>
                            <button className="btn btn-theme-color mr-2" onClick={this.prepareRemove}><i className="far fa-trash-alt"></i></button>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col">
                                {
                                    socials.map(social => social.social_icon !== '' ? (
                                        <div
                                            className={`form-group ${shuffle ? "shuffleForm" : ""}`}
                                            key={social.social_name}
                                            onClick={this.startDrag.bind(this, social.id)}
                                            onMouseEnter={this.checkShuffle.bind(this, social.id)}
                                            onMouseOut={this.clearShuffle.bind(this, social.id)}
                                        >
                                              <div className="input-group mb-2">
                                                <div
                                                    className="input-group-prepend"
                                                    onClick={this.changeFontAwesome.bind(this, social)}
                                                >
                                                  <div
                                                      className="input-group-text socialIcons"
                                                      >
                                                      <i className={social.social_icon}></i>
                                                  </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder={social.social_name}
                                                    value={social.social_link}
                                                    onChange={this.edit.bind(this, social)}
                                                    onFocus={(e)=> e.target.placeholder = ""}
                                                    onBlur={(e) => e.target.placeholder = social.social_name}
                                                    disabled={shuffle}
                                                />
                                            {removing ? (
                                                <div
                                                    className="input-group-append"
                                                    onClick={this.createNew}
                                                >
                                                  <div
                                                    className="input-group-text socialIcons bg-theme-color text-white"
                                                    onClick={this.removeSocial.bind(this,social)}
                                                    >
                                                    <i className="fas fa-trash"></i>
                                                </div>
                                                </div>
                                                ):null}
                                              </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="form-group shuffle tempInput"
                                            key={social.id}
                                            onMouseDown={this.startDrag.bind(this, social.id)}
                                            onMouseEnter={this.checkShuffle.bind(this, social.id)}
                                            onMouseOut={this.clearShuffle.bind(this, social.id)}
                                        >

                                        </div>
                                    ))
                                }
                                <hr/>
                                <div className="form-group">
                                      <div className="input-group mb-2">
                                        <div
                                            className="input-group-prepend"
                                            onClick={this.createNew}
                                        >
                                          <div className="input-group-text socialIcons"><i className="fas fa-plus"></i></div>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Add a new Social Link"
                                            value={this.state.newSocial}
                                            onChange={this.changeNew}
                                            onBlur={this.createNew}
                                        />
                                      </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    {draggingSocial ? (
                        <div
                            className="form-group dragging"
                            style={draggingStyles}
                        >
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                  <div
                                      className="input-group-text socialIcons"
                                      >
                                      <i className={draggingSocial.social_icon}></i>
                                  </div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder={draggingSocial.social_name}
                                    value={draggingSocial.social_link}
                                    disabled={shuffle}
                                />
                            </div>
                        </div>
                    ):null}


                        <FontAwesomeSelector
                            callback={this.handleFontChange}
                            pos={this.state.position}
                            visible={this.state.iconPicker}
                        />


                </div>
            )
        }
    }
}
export default Socals;
