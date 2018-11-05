import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="container-fluid">
            <div className="row">
                <Sidebar />
            </div>
          </div>

        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
