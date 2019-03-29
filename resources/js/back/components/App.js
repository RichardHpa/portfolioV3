import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

const pages = [
    { 'id': 1, 'name': 'Dashboard', 'url': '/admin','icon': 'chart-pie' },
    { 'id': 2, 'name': 'Site Info', 'url': '/admin/info','icon': 'home' },
    { 'id': 3, 'name': 'Projects', 'url': '/admin/projects','icon': 'project-diagram' },
    { 'id': 4, 'name': 'Slides', 'url': '/admin/slides','icon': 'images' },
    { 'id': 5, 'name': 'Invoices', 'url': '/admin/invoices','icon': 'file-invoice-dollar' }
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
