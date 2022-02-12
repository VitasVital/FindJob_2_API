import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import {StockGender, StockRole, StockSalary} from "../StockData";
import Select from "react-select";

export class RegistrationModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
            _name: '',
            email: '',
            password1: '',
            password2: '',
            dateBirth: '',
            gender: '',
            telephoneNumber: '',
            role: '',

            country: '',
            region: '',

            optionSelected_gender: '',
            optionSelected_role: '',
        };

        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
        this.handleInputChange3 = this.handleInputChange3.bind(this);
        this.handleInputChange3_1 = this.handleInputChange3_1.bind(this);
        this.handleInputChange4 = this.handleInputChange4.bind(this);
        this.handleInputChange5 = this.handleInputChange5.bind(this);
        this.handleInputChange6 = this.handleInputChange6.bind(this);
        this.handleInputChange7 = this.handleInputChange7.bind(this);
        this.handleInputChange8 = this.handleInputChange8.bind(this);
    }

    handleSubmit(event){
        // event.preventDefault();
        alert(this.state.password1 + ' ' + this.state.password2)
        if (this.state.password1 !== this.state.password2)
        {
            alert('Пароли не совпадают');
            return;
        }
        fetch(process.env.REACT_APP_API+'registration',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name: this.state._name,
                Email: this.state.email,
                Password: this.state.password1,
                City: this.state.city,
                DateBirth: this.state.dateBirth,
                Gender: this.state.optionSelected_gender,
                Country: this.state.country,
                Region: this.state.region,
                TelephoneNumber: this.state.telephoneNumber,
                Role: this.state.optionSelected_role,
                IsDeleted: false
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

    handleInputChange1(event) {
        this.setState({_name: event.target._name});
    }
    handleInputChange2(event) {
        this.setState({email: event.target.email});
    }
    handleInputChange3(event) {
        this.setState({password1: event.target.password1});
    }
    handleInputChange3_1(event) {
        this.setState({password2: event.target.password2});
    }
    handleInputChange4(event) {
        this.setState({dateBirth: event.target.dateBirth});
    }
    handleInputChange5(event) {
        this.setState({telephoneNumber: event.target.telephoneNumber});
    }
    handleInputChange6(event) {
        this.setState({role: event.target.role});
    }

    handleInputChange7 = (optionSelected_gender) => {
        this.setState({ optionSelected_gender }, () =>
            console.log(`Option selected:`, this.state.optionSelected_gender)
        );
    };

    handleInputChange8 = (optionSelected_role) => {
        this.setState({ optionSelected_role }, () =>
            console.log(`Option selected:`, this.state.optionSelected_role)
        );
    };

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
                                <Form.Group controlId="name">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control type="text" placeholder = "Имя" value={this.state._name} onChange={ this.handleInputChange1 }/>
                                </Form.Group>
                                <Form.Group controlId="name">
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control type="email" placeholder = "email" value={this.state.email} onChange={ this.handleInputChange2 }/>
                                </Form.Group>
                                <Form.Group controlId="name">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password" placeholder = "Пароль" value={this.state.password1} onChange={ this.handleInputChange3 }/>
                                </Form.Group>
                                <Form.Group controlId="name">
                                    <Form.Label>Повторите пароль</Form.Label>
                                    <Form.Control type="password" placeholder = "Пароль" value={this.state.password2} onChange={ this.handleInputChange3_1 }/>
                                </Form.Group>

                                <Form.Group controlId="name">
                                    <Form.Label>Страна</Form.Label>

                                    <CountryDropdown
                                    value={country}
                                    name="citizenship"
                                    onChange={(val) => this.selectCountry(val)} />
                                </Form.Group>

                                <Form.Group controlId="name">
                                    <Form.Label>Регион</Form.Label>

                                    <RegionDropdown
                                    country={country}
                                    value={region}
                                    name="city"
                                    onChange={(val) => this.selectRegion(val)} />
                                </Form.Group>

                                <Form.Group controlId="name">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="date" placeholder = "Дата рождения" value={this.state.dateBirth} onChange={ this.handleInputChange4 }/>
                                </Form.Group>

                                <Form.Group controlId="name">
                                    <Form.Label>Пол</Form.Label>
                                    <Select
                                        value={this.state.optionSelected_gender}
                                        onChange={this.handleInputChange7}
                                        options={StockGender}
                                    />
                                </Form.Group>

                                <Form.Group controlId="name">
                                    <Form.Label>Номер телефона</Form.Label>
                                    <Form.Control type="tel" placeholder = "Номер телефона" value={this.state.telephoneNumber} onChange={ this.handleInputChange5 }/>
                                </Form.Group>

                                <Form.Group controlId="name">
                                    <Form.Label>Роль</Form.Label>
                                    <Select
                                        value={this.state.optionSelected_role}
                                        onChange={this.handleInputChange8}
                                        options={StockRole}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Button className="mr-2" variant="primary"
                                            onClick={()=>this.handleSubmit()}>
                                        Зарегистрироваться
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