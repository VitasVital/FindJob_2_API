import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class LoginModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Email: event.target.email.value,
                Password: event.target.password.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            if (result === 'Успешная авторизация')
            {
                document.cookie = "email" + "=" + encodeURIComponent(event.target.email.value);
                document.cookie = "password" + "=" + encodeURIComponent(event.target.password.value);
                let matches = document.cookie.match(new RegExp(
                    "(?:^|; )" + 'email'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                  ));
                alert(result + " " + decodeURIComponent(matches[1]));
            }
            else
            {
                alert(result);
            }
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
                                        <Form.Label>Логин</Form.Label>
                                        <Form.Control type="text" name="email" required 
                                        placeholder="Логин"/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control type="password" name="password" required 
                                        placeholder="Пароль"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Войти
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