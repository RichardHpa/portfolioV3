import React, { Component } from 'react'


var tabList = [
    { 'id': 1, 'name': 'Home', 'url': '/mike' },
    { 'id': 2, 'name': 'Donnie', 'url': '/donnie' },
    { 'id': 3, 'name': 'Raph', 'url': '/raph' },
    { 'id': 4, 'name': 'Leo', 'url': '/leo' }
];


class Sidebar extends Component {
    render () {

        return (
            <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
                <div className="sidebar-sticky">
                    <Tabs tabList={tabList} />
                </div>
            </nav>
        )
    }
}

class Tabs extends Component {

    constructor (props) {
        super(props)

        this.state = {
            currentPage: 1
        }
    }

    render (){
        const { currentPage } = this.state
        return (
            <ul className="nav flex-column">
            {this.props.tabList.map(function(tab) {
                return (
                    <Tab
                        key={tab.id}
                        id={tab.id}
                        url={tab.url}
                        name={tab.name}
                        activeClass={currentPage}
                    />
                );
            })}
            </ul>
        )
    }
}

class Tab extends Component {
    render (){
        let classes = this.props.activeClass == this.props.id ? 'nav-item active': 'nav-item';
        return (
            <li key={this.props.id} className={classes}>
                <a className="nav-link" href={this.props.url}>
                      <i className=""></i>{this.props.name} <span className="sr-only">(current)</span>
                  </a>
            </li>
        )
    }
}

export default Sidebar
