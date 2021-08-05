import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export class RegistrationModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = { country: '', region: '' };
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'registration',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name: event.target._name.value,
                Email: event.target.email.value,
                Password: event.target.password.value,
                City: event.target.city.value,
                DateBirth: event.target.dateBirth.value,
                GenderId: parseInt(event.target.genderId.value),
                Citizenship: event.target.citizenship.value,
                TelephoneNumber: event.target.telephoneNumber.value,
                RoleId: parseInt(event.target.roleId.value)
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

    selectCountry (val) {
        this.setState({ country: val });
      }
    
      selectRegion (val) {
        this.setState({ region: val });
      }


    render(){
        const { country, region } = this.state;
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
                            Регистрация
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Имя</Form.Label>
                                        <Form.Control type="text" name="_name" required 
                                        placeholder="Имя"/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" required 
                                        placeholder="Email"/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control type="text" name="password" required 
                                        placeholder="Пароль"/>
                                    </Form.Group>

                                    <Form.Group controlId="name">
                                        <Form.Label>Страна</Form.Label>

                                        <CountryDropdown
                                        value={country}
                                        name="citizenship"
                                        onChange={(val) => this.selectCountry(val)} />

                                        <Form.Label>Регион</Form.Label>

                                        <RegionDropdown
                                        country={country}
                                        value={region}
                                        name="city"
                                        onChange={(val) => this.selectRegion(val)} />
                                    </Form.Group>

                                    <Form.Group controlId="name">
                                        <Form.Label>Дата рождения</Form.Label>
                                        <Form.Control type="date" name="dateBirth" required 
                                        placeholder="Дата рождения"/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Гендер</Form.Label>
                                        <Form.Select aria-label="Default select example" name="genderId">
                                        <option>Выбери пол</option>
                                        <option value='1'>Мужской</option>
                                        <option value='2'>Женский</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Номер телефона</Form.Label>
                                        <Form.Control type="tel" name="telephoneNumber" required 
                                        placeholder="Номер телефона"/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Роль</Form.Label>
                                        <Form.Select aria-label="Default select example" name="roleId">
                                        <option>Выбери роль на сайте</option>
                                        <option value='2'>Работодатель</option>
                                        <option value='3'>Соискатель</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Зарегистрироваться
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