import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component{
    constructor(props){
        super(props)

        var startingPath = window.location.pathname;
        var allPages = this.props.pages;
        var currentPage;
        for (var i = 0; i < allPages.length; i++) {
            if(startingPath.search(allPages[i].url) > -1){
                currentPage = allPages[i].id;
            }
        }
        this.state = {
            selectedTab: currentPage
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
                        icon={el.icon}
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
        var classes = 'fas fa-fw fa-' + this.props.icon;
        return(
            <li className={this.props.isActive ? 'nav-item active': 'nav-item'} onClick={this.props.onActiveTab}>
                <Link className="nav-link" to={this.props.url}>
                    <i className={classes}></i> {this.props.pageTitle} <span className="sr-only">(current)</span>
                </Link>
            </li>
        )
    }
}

export default Sidebar
