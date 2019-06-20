import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Loader from '../Loader';


class Dashboard extends Component {
    constructor () {
      super()
      this.state = {
        projects: [],
        pageLoaded: true
      }
    }

    render () {
        const { projects , pageLoaded} = this.state;
        if (!pageLoaded) {
            return (
                <Loader />
            )
        } else {
            return (
                <div className="container ml-0">
                    <div className="row">
                        <div className="col">
                        <h1>Dashboard</h1>
                        <hr/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Dashboard;
