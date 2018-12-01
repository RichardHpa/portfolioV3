import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'
import SiteInfo from './SiteInfo'
import Sidebar from './Sidebar'
import Home from './Home'
import Invoice from './Invoices/Invoice'
import Slides from './Slides/Slides'
import Projects from './Projects/Projects'
import ProjectsCreate from './Projects/Create'
import SingleProject from './Projects/SingleProject'
import NoMatch from './NoMatch'
import Loader from './Loader'


const pages = [
    { 'id': 1, 'name': 'Dashboard', 'url': '/admin','icon': 'chart-pie' },
    { 'id': 2, 'name': 'Site Info', 'url': '/admin/info','icon': 'home' },
    { 'id': 3, 'name': 'Projects', 'url': '/admin/projects','icon': 'project-diagram' },
    { 'id': 4, 'name': 'Slides', 'url': '/admin/slides','icon': 'images' },
    { 'id': 5, 'name': 'Invoices', 'url': '/admin/invoices','icon': 'file-invoice-dollar' }
];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        this.setState({
            isLoaded: true
        })
    }

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
                                    <Route exact path='/admin' component={Home} />
                                    <Route exact path='/admin/info' component={SiteInfo} />
                                    <Route exact path='/admin/projects' component={Projects} />
                                    <Route exact path='/admin/projects/create' component={ProjectsCreate} />
                                    <Route exact path='/admin/projects/:id' component={SingleProject} />
                                    <Route exact path='/admin/slides' component={Slides} />
                                    <Route exact path='/admin/invoices' component={Invoice} />
                                    <Route component={NoMatch} />
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
