import React, { Component } from 'react';
import 'babel-polyfill';
import FormData from 'form-data';
import Loader from '../Loader';
import SectionForm from './SectionForm';
import MediaModal from '../Media/MediaModal';
import { Input, Textarea, Checkbox } from '../Inputs/Input';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            valid: false,
            sections: [{
                sectionID: null,
                mediaID: null,
                section: 1,
            }]
        }

        this.handleReceiveValue = this.handleReceiveValue.bind(this);
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this);
        this.getImage = this.getImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.addSection = this.addSection.bind(this);
        this.handleChangeChecked = this.handleChangeChecked.bind(this);
    }

    componentDidMount () {
        if(this.props.action === '/api/projects/edit'){
            this.setState({
                project: this.props.project
            })
        }
    }

    handleReceiveValue(result){
        let { project } = this.state;
        project[result.input] =  result.value;
        this.setState({
            project: project
        })
    }

    handleChangeChecked(){
        let { project } = this.state;
        if(project.public === 'yes'){
            project.public = 'no';
        } else {
            project.public = 'yes';
        }
        this.setState({
            project: project
        })
    }

    getImage(id){
        let {project} = this.state;
        axios.get(`/api/media/${id}`).then(response => {
            project['project_image'] = response.data.media_name;
            project['media_id'] = response.data.id
            this.setState({
                project: project
            })
        })
    }

    removeImage(e){
        let {project} = this.state;
        e.preventDefault();
        project['project_image'] = null;
        project['media_id'] = null;
        this.setState({
            project: project
        })
    }

    addSection(e){
        e.preventDefault();
        const {sections} = this.state;
        sections.push({
            sectionID: null,
            mediaID: null,
            section: sections.length,
        });
        this.setState({
            sections
        })
    }

    handleCreateNewProject(e){
        e.preventDefault();
        const { project, sections} = this.state;
        const { history, action } = this.props
        if(project.project_name && project.project_description && project.project_bio && project.media_id){
            this.setState({
                sendingData: true
            });

            let form = new FormData();
            if(project.media_id){
                form.append('image_id', project.media_id);
            }
            if(this.props.action === '/api/projects/edit'){
                form.append('project_id', this.props.project['id'])
            }
            form.append('project_name', project.project_name);
            form.append('project_description', project.project_description);
            form.append('project_bio', project.project_bio);

            form.append('project_github', project.github_link);
            form.append('project_link', project.website_url);
            form.append('project_public', project.public)
            const str_json = JSON.stringify(sections)
            form.append('sections', str_json)
            axios.post(action, form, {
                headers: {
                  'accept': 'application/json',
                  'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                }
            })
            .then((response) => {
                console.log(response)
                if(response['data']['message'] === 'success'){
                    this.setState({
                        sendingData: false
                    });
                    history.push('/admin/projects');
                }
            }).catch((error) => {
                console.log('error');
            });
        } else {
            console.log('error');
        }
    }



    render(){
        const { ready, sendingData, project, media , sections}  = this.state;
        // console.log(project);
        return(
            <form autoComplete="off" onSubmit={this.handleCreateNewProject}>
                <div className="form-row">
                    <div className="col12 col-md-8 h-100 p-2 justify-content-between">
                        <Input
                            type="text"
                            placeholder="Project Name"
                            validation="required,min:5,max:100"
                            label="Project Name"
                            receiveInput={this.handleReceiveValue}
                            name="project_name"
                            value={project.project_name || ''}
                        />
                        <Textarea
                            label="Project Bio"
                            rows="5"
                            validation="required,min:5"
                            receiveInput={this.handleReceiveValue}
                            name="project_bio"
                            value={project.project_bio || ''}
                        />
                        <Textarea
                            label="Project Description"
                            rows="10"
                            validation="required,min:50"
                            receiveInput={this.handleReceiveValue}
                            name="project_description"
                            value={project.project_description || ''}
                        />
                            <div className="sections">
                            {
                                sections.map((section, i) => (
                                    <SectionForm
                                        key={i}
                                    />
                                ))
                            }
                            </div>
                        <div className="row pt-3">
                            <div className="col d-flex justify-content-center">
                                <button
                                    className="btn btn-theme-color"
                                    onClick={this.addSection}
                                >Add New Section</button>
                            </div>
                        </div>
                    </div>
                    <div className="col12 col-md-4">
                        <div className="card h-100 p-2 mb-3">
                            <div>
                                <div className="form-group">
                                    <label>Main Project Image</label>
                                    {
                                        project.media_id?
                                        <div className="form-group">
                                            <img alt="Crop" className="img-fluid" src={`/images/uploads/thumbnails/${project.project_image}.jpg`} />
                                            <button className="btn btn-theme-color btn-block mt-1" onClick={this.removeImage}>Remove Image</button>
                                        </div>
                                        :
                                        ''
                                    }
                                    <MediaModal
                                        btnType='dashed'
                                        sendImage={this.getImage}
                                    />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Github Link"
                                    label="Github Link"
                                    receiveInput={this.handleReceiveValue}
                                    name="github_link"
                                    value={project.github_link || ''}
                                />
                                <Input
                                    type="text"
                                    placeholder="Website URL"
                                    label="Website URL"
                                    receiveInput={this.handleReceiveValue}
                                    name="website_url"
                                    value={project.website_url || ''}
                                />

                                <Checkbox
                                    label="Public"
                                    type="checkbox"
                                    name="public"
                                    checked={project.public}
                                    changeChecked={this.handleChangeChecked}
                                />
                            </div>
                            <button type="submit" className="btn btn-theme-color btn-block">{this.props.inputLabel}</button>
                        </div>
                    </div>
                </div>
                {sendingData ? (<Loader
                    />
                ):null}
            </form>
        )
    }
}

export default ProjectForm;
