import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Projects from './Projects/Projects';
import ProjectsCreate from './Projects/Create';
import Socals from './Socials/Socials';
import SingleProject from './Projects/SingleProject'
import EditProject from './Projects/Edit'

const pages = [
    { 'id': 1, 'name': 'Dashboard', 'url': '/admin','icon': 'chart-pie' },
    { 'id': 2, 'name': 'Site Info', 'url': '/admin/info','icon': 'home' },
    { 'id': 3, 'name': 'Social Links', 'url': '/admin/socials','icon': 'share-alt' },
    { 'id': 4, 'name': 'Projects', 'url': '/admin/projects','icon': 'project-diagram' },
    { 'id': 5, 'name': 'Slides', 'url': '/admin/slides','icon': 'images' },
    { 'id': 6, 'name': 'Invoices', 'url': '/admin/invoices','icon': 'file-invoice-dollar' }
];

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <div className="container-fluid">
                        <div className="row">
                            <Sidebar
                                pages={pages}
                            />
                            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                                <Switch>
                                    <Route exact path='/admin/socials' component={Socals} />
                                    <Route exact path='/admin/projects' component={Projects} />
                                    <Route exact path='/admin/projects/create' component={ProjectsCreate} />
                                    <Route exact path='/admin/projects/edit/:id' component={EditProject} />
                                    <Route exact path='/admin/projects/view/:id' component={SingleProject} />

                                </Switch>
                            </main>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
