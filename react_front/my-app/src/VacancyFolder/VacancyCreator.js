import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import queryString from 'query-string';

export class VacancyCreator extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={
            vacancyModal: null,
            isRedirect: false
        }
    }

    componentDidMount() {
    }

    handleSubmit(event){
        let matches_id = document.cookie.match(new RegExp(
            "(?:^|; )" + 'id'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));

        fetch(process.env.REACT_APP_API+'vacancy',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VacancyId: this.state.vacancyModal.id,
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

    RenderData() {
        if (this.state.vacancyModal != null) {
            return (
                <div>
                    <h2>{this.state.vacancyModal.name}</h2>
                    <h4>Зарплата</h4>
                    <h5>от {this.state.vacancyModal.minSalary} до {this.state.vacancyModal.maxSalary}</h5>
                    <h4>Должность</h4>
                    <h5>{this.state.vacancyModal.jobTitle}</h5>
                    <h5>Описание</h5>
                    <p>{this.state.vacancyModal.description}</p>
                    <h5>Город</h5>
                    <p>{this.state.vacancyModal.region}</p>
                    <h5>Номер телефона</h5>
                    <p>{this.state.vacancyModal.telephoneNumber}</p>
                    <h5>Требования</h5>
                    <p>{this.state.vacancyModal.requirements}</p>
                    <h5>Обязанности</h5>
                    <p>{this.state.vacancyModal.duties}</p>
                    <h5>Условия</h5>
                    <p>{this.state.vacancyModal.conditions}</p>
                    <Button className="mr-2" variant="info" onClick={() => this.handleSubmit()}>
                        Откликнуться
                    </Button>
                </div>
            )
        }
        return <h1>Данной вакансии нет</h1>;
    }

    render(){
        return (
            <div className="container">
                {this.RenderData()}
            </div>
        )
    }

}