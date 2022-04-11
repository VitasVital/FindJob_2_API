import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export class EditAuthenticationModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = { country: '', region: '' };
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'login',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id: this.props.deps.id,
                Name: event.target._name.value,
                Email: event.target.email.value,
                Password: event.target.password.value,
                City: event.target.city.value,
                DateBirth: event.target.dateBirth.value,
                Gender: event.target.gender.value,
                Citizenship: event.target.citizenship.value,
                TelephoneNumber: event.target.telephoneNumber.value,
                Role: event.target.role.value,
                IsDeleted: false
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            document.cookie = "email=" + event.target.email.value;
            document.cookie = "password=" + event.target.password.value;
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    deleteDep(email, pass){
        if(window.confirm('Вы действительно хотите удалить страницу?')){
            fetch(process.env.REACT_APP_API+'login/'+email+'/'+pass,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
            },
            (error)=>{
                alert('Failed');
            })
        }
        document.cookie = "email=" + {email} + ";" + "max-age=0";
        document.cookie = "password=" + {pass} + ";" + "max-age=0";
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
                            Изменение страницы
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="name">
                                        <Form.Label>Имя</Form.Label>
                                        <Form.Control type="text" name="_name" required 
                                        defaultValue={this.props.deps.name}
                                        placeholder="Имя"/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" required 
                                        defaultValue={this.props.deps.email}
                                        placeholder="Email"/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Пароль</Form.Label>
                                        <Form.Control type="text" name="password" required 
                                        defaultValue={this.props.deps.password}
                                        placeholder="Пароль"/>
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
                                        <Form.Label>Дата рождения</Form.Label>
                                        <Form.Control type="date" name="dateBirth" required 
                                        defaultValue={this.props.deps.dateBirth}
                                        placeholder="Дата рождения"/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Гендер</Form.Label>
                                        <Form.Select aria-label="Default select example" name="gender" defaultValue={this.props.deps.gender}>
                                        <option>Выбери пол</option>
                                        <option value='Мужской'>Мужской</option>
                                        <option value='Женский'>Женский</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Номер телефона</Form.Label>
                                        <Form.Control type="tel" name="telephoneNumber" required 
                                        defaultValue={this.props.deps.telephoneNumber}
                                        placeholder="Номер телефона"/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Роль</Form.Label>
                                        <Form.Select aria-label="Default select example" name="role" defaultValue={this.props.deps.role}>
                                        <option>Выбери роль на сайте</option>
                                        <option value='Работодатель'>Работодатель</option>
                                        <option value='Соискатель'>Соискатель</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group>
                                        <h1></h1>
                                        <Button variant="primary" type="submit">
                                            Изменить
                                        </Button>
                                        <h1></h1>
                                    </Form.Group>

                                    <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteDep(this.props.deps.email, this.props.deps.password)}>
                                                Удалить страницу
                                            </Button>
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