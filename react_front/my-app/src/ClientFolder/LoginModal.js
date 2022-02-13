import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import {StockVacancies} from "../StockData";

export class LoginModal extends Component{
    constructor(props){
        super(props);
        this.state={
            login: '',
            password: ''
        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
    }

    handleSubmit(event){
        // event.preventDefault();
        fetch(process.env.REACT_APP_API+'login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Email: this.state.login,
                Password: this.state.password
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            if (result !== 'Неудачная авторизация')
            {
                document.cookie = "id" + "=" + encodeURIComponent(result);
                alert('Успешная авторизация');
            }
            else
            {
                alert('Неудачная авторизация');
            }
        },
        (error)=>{
            alert('Failed');
        })
    }

    handleInputChange1 = e => this.setState({ login: e.target.value });

    handleInputChange2 = e => this.setState({ password: e.target.value });

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
                            Авторизация
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <p>
                                    gsdhsdgh@dfsfs
                                    fsdvxc
                                </p>
                                <Form.Group controlId="name">
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control type="text" placeholder = "Логин" value={this.state.login} onChange={ this.handleInputChange1 }/>
                                </Form.Group>
                                <Form.Group controlId="name">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password" placeholder = "Пароль" value={this.state.password} onChange={ this.handleInputChange2 }/>
                                </Form.Group>

                                <Form.Group>
                                    <Button className="mr-2" variant="primary"
                                            onClick={()=>this.handleSubmit()}>
                                        Войти
                                    </Button>
                                </Form.Group>
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