import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Loader from '../Loader';
import FormData from 'form-data';

class Projects extends Component {
    constructor () {
      super()
      this.state = {
        projects: [],
        pageLoaded: false,
        shuffle: false,
        shuffleIcon: 'fas fa-random',
        draggingProject: null,
        draggingProjectMouse:{
            currentX: 0,
            currentY: 0,
        },
        showingTemp: false,
        currentHover: 0
      }
      this.shuffle = this.shuffle.bind(this);
      this.startDrag = this.startDrag.bind(this);
      this.move = this.move.bind(this);
      this.checkShuffle = this.checkShuffle.bind(this);
      this.clearShuffle = this.clearShuffle.bind(this);
    }

    componentDidMount () {
        axios.get('/api/projects').then(response => {
            this.setState({
                projects: response.data,
                pageLoaded: true
            })
        })
    }

    shuffle(){
        const {shuffle} = this.state;
        if(shuffle == false){
            this.setState({
                shuffle: true,
                shuffleIcon: 'fas fa-save'
            })
        } else {
            this.setState({
                shuffle: false,
                shuffleIcon: 'fas fa-random',
                draggingProject: null,
                draggingProjectMouse:{
                    currentX: 0,
                    currentY: 0
                }
            })
            let form = new FormData();
            form.append('projects', JSON.stringify(this.state.projects));
            axios.post('/api/projects/reorder', form).then(response => {
                console.log(response);
            })
        }

    }

    startDrag(e, event){
        const {shuffle, draggingProject, projects, draggingProjectMouse, showingTemp} = this.state;
        if(showingTemp === true){
            for (var i = 0; i < projects.length; i++) {
                if(projects[i].id === 0){
                    projects.splice(i, 1);
                    projects.splice(i, 0, draggingProject);
                    this.setState({
                        draggingProject: null,
                        draggingProjectMouse:{
                            currentX: 0,
                            currentY: 0,
                        },
                        showingTemp: false,
                        currentHover: 0
                    })
                    break;
                }
            }
            return;
        }
        var k = window.event
        if(shuffle === true){
            var card = e;
            for (var i = 0; i < projects.length; i++) {
                if(projects[i].id === card){
                    this.setState({
                        draggingProject: projects[i],
                        draggingProjectMouse: {
                            currentX: k.clientX,
                            currentY: k.clientY,
                        },
                        showingTemp: true,
                        currentHover: -1
                    })
                    document.onmousemove= this.move;
                    projects.splice(i, 1, {
                        id: 0,
                        project_name: '',
                        project_image: ''
                    });
                    break;
                }
            }

        }
    }


    move(e){
        this.setState({
            draggingProjectMouse: {
                currentX: e.clientX - 20,
                currentY: e.clientY - 20
            }
        })
    }

    checkShuffle(num){
        const {shuffle, projects, draggingProject, showingTemp} = this.state;
        if(shuffle && draggingProject){
            // console.log('enter '+num);
            if(showingTemp === false){
                this.setState({
                  showingTemp: true,
                  currentHover: num
                }, () => {
                    if((projects[projects.length - 1].id === 0) && (num !== 0)){
                        projects.splice(-1,1);
                    }
                    for (var i = 0; i < projects.length; i++) {
                        if((projects[i].id === num) && (num !== 0)){
                            projects.splice(i, 0, {
                                id: 0,
                                project_name: '',
                                project_image: ''
                            });
                            break;
                        }
                    }


                })
            }
        }
    }

    clearShuffle(num){
        const {shuffle, projects, draggingProject, showingTemp, currentHover} = this.state;
        if(shuffle && draggingProject){
            if((showingTemp === true) && (currentHover !== num)){
                this.setState({
                  showingTemp: false,
                  currentHover: null
                }, () => {
                    for (var i = 0; i < projects.length; i++) {
                        if(projects[i].id === 0){
                            projects.splice(i, 1);
                            break;
                        }
                    }
                    projects.push({
                        id: 0,
                        project_name: '',
                        project_image: ''
                    })
                })
            }
            if(num === 0){
                this.setState({
                    showingTemp: false
                })
            }
        }
    }

    render () {
        const { projects , pageLoaded, shuffle, draggingProject, draggingProjectMouse} = this.state;
        var draggingStyles = {
          top: draggingProjectMouse.currentY,
          left: draggingProjectMouse.currentX,
        };
        if (!pageLoaded) {
            return (
                <Loader />
            )
        } else {
            return (
                <div className="container ml-0 h-100">
                    <div className="row">
                        <div className="col">
                        <h1>All Projects</h1>
                        <hr/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <Link className="btn btn-theme-color mr-2" to='./projects/create'>Add New Project</Link>
                            <button className="btn btn-theme-color mr-2" onClick={this.shuffle}><i className={this.state.shuffleIcon}></i></button>
                        </div>
                    </div>
                    <div className="row">
                        {
                            projects.map(project => project.project_name !== '' ? (
                                <div
                                    className={`col-12 col-sm-6 col-md-4 col-lg-4 mb-5 ${shuffle ? "shuffle" : ""}`}
                                    key={project.id}
                                    onClick={this.startDrag.bind(this, project.id)}
                                >
                                    <div
                                        className={`card h-100 text-center shadow-lg justify-content-between`}
                                        onMouseEnter={this.checkShuffle.bind(this, project.id)}
                                        onMouseOut={this.clearShuffle.bind(this, project.id)}
                                    >
                                        <Link
                                            className={`${shuffle ? "disable-link" : ""}`}
                                            to={`/admin/projects/view/${project.id}`}
                                        >
                                            <img src={`../images/uploads/heroImages/${project.project_image}.jpg`} className="card-img-top" alt="..."/>
                                            <div className="card-body">
                                                <h5 className="card-title">{project.project_name} - {project.id}</h5>
                                            </div>
                                        </Link>
                                        <div className="card-footer p-0">
                                            <Link
                                                to={`/admin/projects/edit/${project.id}`}
                                                className={`btn btn-theme-color btn-block ${shuffle ? "disable-link" : ""}`}
                                            >
                                                Edit Project
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                ) : (
                                    <div
                                        className={`col-12 col-sm-6 col-md-4 col-lg-4 mb-5  ${shuffle ? "shuffle" : ""}`}
                                        key={project.id}
                                        onMouseDown={this.startDrag.bind(this, project.id)}
                                    >
                                        <div
                                            className={`card h-100 text-center shadow-lg justify-content-center align-items-center temporary`}
                                            onMouseEnter={this.checkShuffle.bind(this, project.id)}
                                            onMouseOut={this.clearShuffle.bind(this, project.id)}
                                        >
                                        </div>
                                    </div>
                                )
                        )}


                    </div>
                    {draggingProject ? (
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 dragging"
                            style={draggingStyles}
                            onMouseUp={this.sort}
                            onMouseOver={this.move}
                        >
                            <div className="card text-center shadow-lg justify-content-between">
                                <img src={`../images/uploads/heroImages/${draggingProject.project_image}.jpg`} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{draggingProject.project_name}</h5>
                                </div>
                                <div className="card-footer p-0">
                                    <button className="btn btn-theme-color btn-block">Edit Project</button>
                                </div>
                            </div>
                        </div>
                    ):null}
                </div>
            )
        }
    }
}
export default Projects;
