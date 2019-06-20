import React, { Component } from 'react';
import ReactDom from 'react-dom';
import "./FontAwesomeSelector.scss";
import allFaIcons from './icons.json';


class FontAwesomeSelector extends Component {
    constructor(props) {
      super(props);
      this.state = {
          allIcons: [],
          orignalIcons: [],
          visible: false
      }
      this.filter = this.filter.bind(this)
      this.close = this.close.bind(this)
    }

    componentDidMount(){
        this.setState({
            allIcons: allFaIcons,
            orignalIcons: allFaIcons,
            position: this.props.pos
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.pos !== prevProps.pos) {
            this.setState({
                position: this.props.pos,
            })
        }
        if(this.props.visible !== prevProps.visible){
            this.setState({
                visible: this.props.visible
            })
        }
    }

    chooseIcon(icon){
        this.props.callback(icon);
    }

    filter(e){
        const {orignalIcons} = this.state;
        var value = e.target.value;
        var filteredIcons = [];
        for (var i = 0; i < orignalIcons.length; i++) {
            if (orignalIcons[i]['icon'].indexOf(value) > -1){
             filteredIcons.push(orignalIcons[i]);
            }
        }
        this.setState({
            allIcons: filteredIcons
        })

    }

    close(){
        this.setState({
            visible: false
        })
    }

    render() {
        const { position , visible} = this.state;
        var styles = {};
        if(position){
            styles = {
                left: position['left'],
                top: position['y'] + position['height'] +5
            }
        }
        if(visible){
            styles['display'] = 'flex';
        } else {
            styles['display'] = 'none';
        }
        return(
            <FontAwesomeSelectorPortal>
                <div className="fontAwesomeSelector" style={styles}>
                <div id="FATopBar">
                    <input
                        type="text"
                        placeholder="Search for an Icon"
                        onChange={this.filter}
                        />
                    <div className="close"
                        onClick={this.close}
                    >
                        <i className="fas fa-times"></i>
                    </div>
                </div>

                    <div className="iconList">
                        {
                            this.state.allIcons.map(icon => {
                                return(
                                    <div
                                    key={icon.icon}
                                    className="smallIcon"
                                    onClick={this.chooseIcon.bind(this, icon.icon)}
                                    >
                                        <i className={icon.icon}></i>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </FontAwesomeSelectorPortal>
        )
    }
}

class FontAwesomeSelectorPortal extends Component{
    constructor(props) {
      super(props);
      this.state = {

      }
      this.el = document.createElement('div');
      // this.el.style.display = 'contents';
    }

    componentDidMount(){
        // document.body.appendChild(this.el);
        document.getElementById('app').appendChild(this.el);
    }

    componentWillUnmount(){
        // document.body.removeChild(this.el)
        document.getElementById('app').removeChild(this.el);
    }

    render() {
        return ReactDom.createPortal(
            this.props.children,
            this.el
        )
    }
}

export default FontAwesomeSelector;
