import React, { Component } from 'react'

class Invoice extends Component {
    render () {

        return (
            <div className="container ml-0">

                <div className="row">
                    <div className="col">
                        <h1>Invoice Page</h1>
                        <hr/>
                    </div>
                </div>

                <form>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Company Name</label>
                                <input type="text" className="form-control" placeholder="Company Name" name="company_name"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                <label>Hours</label>
                                <input type="text" className="form-control" placeholder="Hours Worked" name="hours_worked"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Price</label>
                                <input type="text" className="form-control" placeholder="Amount Charged" name="amount_charged"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <input type="submit" className="btn btn-outline-theme-color"/>
                            </div>
                        </div>
                    </div>
                </form>


            </div>
        )
    }
}

export default Invoice
