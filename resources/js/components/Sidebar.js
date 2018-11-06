import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTab: 1
        }
    }

    isActive(id){
        return this.state.selectedTab === id;
    }

    setActiveTab(selectedTabID){
        this.setState({selectedTab:selectedTabID})
    }

    render(){
        var allPages = this.props.pages,
        tabs = allPages.map(function(el, i){
            return <Tab
                        key={i}
                        pageTitle={el.name}
                        url={el.url}
                        isActive={this.isActive(el.id)}
                        onActiveTab={this.setActiveTab.bind(this, el.id)}
                    />
        }, this)
        return(
            <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        {tabs}
                    </ul>
                </div>
            </nav>
        )
    }
}

class Tab extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <li className={this.props.isActive ? 'nav-item active': 'nav-item'} onClick={this.props.onActiveTab}>
                <Link className="nav-link" to={this.props.url}>
                    <i className="fas fa-tachometer-alt fa-fw"></i>{this.props.pageTitle} <span className="sr-only">(current)</span>
                    </Link>
            </li>
        )
    }
}

export default Sidebar
