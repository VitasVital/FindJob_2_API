import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddCltModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'client',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //Id:null,
                //Name:event.target.Name.value
                Id: null,
                Name: event.target.name.value,
                Email: null,
                Password: null,
                CityId: null,
                DateBirth: null,
                GenderId: null,
                CitizenshipId: null,
                TelephoneNumber: null,
                RoleId: null
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header clooseButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Client
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Name client</Form.Label>
                                <Form.Control type="text" name="name" required 
                                placeholder="Name"/>
                            </Form.Group>

                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Add Client
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal>

            </div>
        )
    }

}