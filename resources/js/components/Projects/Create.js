import React, { Component } from 'react';

class ProjectsCreate extends Component {
    constructor(props) {
        super(props);

        this.handleModalShowClick = this.handleModalShowClick.bind(this);
        this.handleModalCloseClick = this.handleModalCloseClick.bind(this);

        this.state = {
            showModal: false
        }
    }


    handleModalShowClick(e){
        e.preventDefault();
        this.setState({
            showModal: true
        })
    }

    handleModalCloseClick(){
        this.setState({
            showModal: false
        })
    }

    render () {
        const {showModal} = this.state;
        return (
            <div className="container ml-0">
                <div className="row">
                    <div className="col">
                        <h1>Projects Create Page</h1>
                        <hr/>
                    </div>
                </div>
                <form>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Project Name</label>
                                <input type="text" className="form-control" placeholder="Project Name" name="project_name"/>
                            </div>
                            <div className="form-group">
                                <label>Project Description</label>
                                <textarea className="form-control" name="project_description"></textarea>
                            </div>
                            <div className="form-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="customFile" onChange={this.handleModalShowClick}/>
                                    <label className="custom-file-label">Choose file</label>
                                    {showModal ? (<Modal handleModalCloseClick={this.handleModalCloseClick}/>):null}
                                </div>
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

class Modal extends Component {
    constructor(props){
        super(props)
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    componentDidMount(){
        const { handleModalCloseClick } = this.props;
        $(this.modal).modal('show');
        $(this.modal).on('hidden.bs.modal', handleModalCloseClick);
    }

    handleCloseClick(){
        const { handleModalCloseClick } = this.props;
        $(this.modal).modal('hide');
        handleModalCloseClick();
    }

    render(){
        return (
            <div>
                <div className="modal fade" ref={modal => this.modal = modal} id="exampleModalLong" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        ...
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel Cropping</button>
                        <button type="button" className="btn btn-theme-color">Save Crop</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default ProjectsCreate
