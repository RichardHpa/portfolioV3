import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import Invoice from './Invoice'
import NoMatch from './NoMatch'

const pages = [
    { 'id': 1, 'name': 'Home', 'url': '/admin','icon': '' },
    { 'id': 2, 'name': 'Invoices', 'url': '/admin/invoices','icon': '' }
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
                    <div className="container">
                        <Switch>
                            <Route exact path='/admin' component={Home} />
                            <Route exact path='/admin/invoices' component={Invoice} />
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                </main>
            </div>
          </div>

        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
