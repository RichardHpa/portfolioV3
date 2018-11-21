import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import Invoice from './Invoices/Invoice'
import Slides from './Slides/Slides'
import Projects from './Projects/Projects'
import ProjectsCreate from './Projects/Create'
import NoMatch from './NoMatch'


const pages = [
    { 'id': 1, 'name': 'Home', 'url': '/admin','icon': 'home' },
    { 'id': 2, 'name': 'Projects', 'url': '/admin/projects','icon': 'project-diagram' },
    { 'id': 3, 'name': 'Slides', 'url': '/admin/slides','icon': 'images' },
    { 'id': 4, 'name': 'Invoices', 'url': '/admin/invoices','icon': 'file-invoice-dollar' }
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
                                    <Route exact path='/admin/invoices' component={Invoice} />
                                    <Route exact path='/admin/projects' component={Projects} />
                                    <Route exact path='/admin/projects/create' component={ProjectsCreate} />
                                    <Route exact path='/admin/slides' component={Slides} />

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
