import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class ShowVacancyModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'vacancy',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //Id:null,
                //Name:event.target.Name.value
                VacancyId: this.props.depid,
                ClientId: 1
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
                            Проссмотр вакансии
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <h2>{this.props.depname}</h2>
                            <h4>{this.props.depsalary}</h4>
                            <p>{this.props.depdescription}</p>
                        </div>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Откликнуться
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Закрыть</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}