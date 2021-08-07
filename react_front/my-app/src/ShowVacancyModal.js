import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class ShowVacancyModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    checkCookie() {
        let matches_id = document.cookie.match(new RegExp(
            "(?:^|; )" + 'id'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
        let matches_email = document.cookie.match(new RegExp(
            "(?:^|; )" + 'email'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
          let matches_pass = document.cookie.match(new RegExp(
            "(?:^|; )" + 'password'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
        if (matches_email && matches_pass && matches_id) 
        {
            return true;
        }
        return false;
    }

    handleSubmit(event){
        if (this.checkCookie() === false) 
        {
            alert('Вы не зарегистрированный пользователь');
            return
        }
        let matches_id = document.cookie.match(new RegExp(
            "(?:^|; )" + 'id'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'vacancy',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VacancyId: this.props.depid,
                ClientId: parseInt(decodeURIComponent(matches_id[1]))
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
                            <h4>Должность</h4>
                            <h5>{this.props.depJobTitle}</h5> 
                            <h5>Описание</h5>
                            <p>{this.props.depdescription}</p>
                            <h5>Город</h5>
                            <p>{this.props.depcity}</p> 
                            <h5>Номер телефона</h5>
                            <p>{this.props.depTelephoneNumber}</p> 
                            <h5>Требования</h5>
                            <p>{this.props.depRequirements}</p> 
                            <h5>Обязанности</h5> 
                            <p>{this.props.depDuties}</p>  
                            <h5>УСловия</h5>
                            <p>{this.props.depConditions}</p> 
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