import React from 'react';
import axios from 'axios'; //will be using axios instead of fetch for HTTP requests.
import './App.css';
//Bootstrap Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//Components
import Titles from './components/Titles';
import Forms from './components/Forms';
import Projects from './components/Projects';
import Modal from './components/Modal';

export default class App extends React.Component {

  //Contruncted starting state:
  state = {
    projects: [],
    error: "Error - Please try again",
    showModal: false,
    editProject: null
  };

  //test comment
    
  //ON LOAD
 componentWillMount = () => {
      axios.get('/api')
      .then(
        (res) => {
          this.setState({
              projects: res.data
          });
        },
        (error) => {
          console.log(error);
          this.setState({
              error
          });
        }
      )
  }

  //POST
  addProject = (e) => { 
    e.preventDefault(); 
    const id = e.target.id.value; 
    const title = e.target.title.value; 
    axios.post("/api", {
        id: id,
        title: title
        })
        .then( res => {
          const newProjects = [...this.state.projects];
          newProjects.push(res.data);
          this.setState({projects: newProjects});
        })
        .catch(error => console.log(`${error}`));
  }
 
  //PUT
  editProject = (e) => {
    e.preventDefault(); 
    const id = this.state.editProject.id; 
    const title = e.target.title.value;
    axios.put("/api", {
      id: id,
      title: title
      })
      .then( res => {
        const newProjects = [...this.state.projects];
        const targetItem = newProjects.find(item => item.id === res.data.id);
        targetItem.title = res.data.title;
        this.setState({projects: newProjects});
        this.hideModal();
      })
      .catch(error => console.log(`Error: ${error}`));
  }

  //DELETE
  deleteProject = (id) => {
    axios.delete("/api", {params: {id: id}})
    .then(res => {
      const filteredProjects = this.state.projects.filter(item =>item.id !== id);
      this.setState({projects: filteredProjects});
    })
    .catch(error => console.log(`Error message: ${error}`));
  }
  
  //MODAL HANDLING
  showModal = (project) => {
    this.setState({showModal: true, editProject: project});
  } 

  hideModal = () => {
    this.setState({showModal: false,  editProject: null});
  } 


  render() {
    return (
      <div>
          <div className="main">
              <Container className="container">
                  <Row className="row">
                      <Col className="title-container">
                          <Titles />
                      </Col>
                  </Row>
                  <Row className="row">
                      <Col className="forms-container">
                          <Forms onSubmit={this.addProject} />
                      </Col>
                  </Row>
                  <Row className="row">
                      <Col className="projects-container">
                          <Projects projects={this.state.projects} deleteProject={this.deleteProject} editProject={this.showModal} />
                      </Col>
                  </Row>
                  <Modal show={this.state.showModal} onHide={this.hideModal} submitEdit={this.editProject}/>
              </Container>
          </div>
      </div>
    );
  }
}


