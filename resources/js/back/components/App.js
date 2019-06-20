import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Projects from './Projects/Projects';
import ProjectsCreate from './Projects/Create';
import SingleProject from './Projects/SingleProject';
import EditProject from './Projects/Edit';
import Socals from './Socials/Socials';
import Info from './Info/Info';
import Dashboard from './Dashboard/Dashboard';

const pages = [
    { 'id': 1, 'name': 'Dashboard', 'url': '/admin','icon': 'chart-pie' },
    { 'id': 2, 'name': 'Site Info', 'url': '/admin/info','icon': 'home' },
    { 'id': 3, 'name': 'Projects', 'url': '/admin/projects','icon': 'project-diagram' },
    { 'id': 4, 'name': 'Social Links', 'url': '/admin/socials','icon': 'share-alt' },
    // { 'id': 5, 'name': 'Slides', 'url': '/admin/slides','icon': 'images' },
    // { 'id': 6, 'name': 'Invoices', 'url': '/admin/invoices','icon': 'file-invoice-dollar' }
];

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <Header />
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <Sidebar
                            pages={pages}
                        />
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 h-100">
                            <Switch>
                                <Route exact path='/admin/' component={Dashboard} />
                                <Route exact path='/admin/socials' component={Socals} />
                                <Route exact path='/admin/projects' component={Projects} />
                                <Route exact path='/admin/projects/create' component={ProjectsCreate} />
                                <Route exact path='/admin/projects/edit/:id' component={EditProject} />
                                <Route exact path='/admin/projects/view/:id' component={SingleProject} />
                                <Route exact path='/admin/info' component={Info} />

                            </Switch>
                        </main>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
