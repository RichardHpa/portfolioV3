import React, { Component } from 'react';
import ProjectForm from './ProjectForm';
import Loader from '../Loader';

class EditProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            pageLoaded: false,
            sendingData: false,
            errors: []
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount () {
      const projectId = this.props.match.params.id
      axios.get(`/api/projects/${projectId}`).then(response => {
        this.setState({
          project: response.data,
          pageLoaded: true
        })
      })
    }

    handleDelete(){
        this.setState({
            sendingData: true
        });
        const { history } = this.props
        let form = new FormData();
        form.append('id', this.state.project['id']);
        axios.post('/api/projects/delete', form, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
            }
        })
        .then((response) => {
            console.log(response);
            if(response['data'] === 'success'){
                this.setState({
                    pageLoaded: false
                });
                history.push('/admin/projects');
            }
        }).catch((error) => {
            console.log('error');
        });
    }

    render () {
        const { history } = this.props
        const { project , pageLoaded} = this.state;
        if (!pageLoaded) {
            return (
                <Loader />
            )
        } else {
            return (
                <div className="container-fluid ml-0">
                    <div className="row">
                        <div className="col">
                            <h1>Edit {project.project_name}</h1>
                            <button onClick={this.handleDelete} className="btn btn-theme-color">Delete Project</button>
                        </div>
                    </div>
                    <ProjectForm
                        action="/api/projects/edit"
                        project={project}
                        inputLabel="Edit Project"
                        history={history}
                    />
                </div>
            )
        }

    }
}

export default EditProject
