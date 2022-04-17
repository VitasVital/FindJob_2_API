import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import queryString from 'query-string';

export class VacancyModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={
            vacancyModal: null,
            isRedirect: false,
            clientInformation: null
        }
    }

    componentDidMount() {
        const id_modal = queryString.parse(this.props.location.search).vacancyId;
        fetch(process.env.REACT_APP_API +'Vacancy/GetVacancy/'+id_modal)
            .then(response => response.json())
            .then(data => this.setState({ vacancyModal: data }));
        let matches_id = document.cookie.match(new RegExp(
            "(?:^|; )" + 'id'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        if (matches_id === null)
        {
            return;
        }
        let id_client = decodeURIComponent(matches_id[1]);
        fetch(process.env.REACT_APP_API+'login/GetUser/'+id_client)
            .then(response=>response.json())
            .then(data=>{
                this.setState({clientInformation:data});
            });
    }

    checkCookie() {
        let matches_id = document.cookie.match(new RegExp(
            "(?:^|; )" + 'id'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches_id !== null;
    }

    handleSubmit(event){
        if (!this.checkCookie())
        {
            const conf = window.confirm(`Вы не зарегистрированный пользователь.\n Желаете зарегистрироваться?`);

            this.setState({ isRedirect: conf });
            return;
        }
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

    RenderButton() {
        if (this.state.clientInformation !== null) {
            if (this.state.clientInformation.role_Id === 1
                && this.state.clientInformation.companyId === this.state.vacancyModal.companyId) {
                return (
                    <div>
                        <p>
                            <Button className="mr-2" variant="info" onClick={() => this.handleSubmit()}>
                                Редактировать вакансию
                            </Button>
                        </p>
                        <p>
                            <Button className="mr-2" variant="info" onClick={() => this.handleSubmit()}>
                                Посмотреть отклики
                            </Button>
                        </p>
                    </div>
                );
            }
            else if (this.state.clientInformation.role_Id === 1) {
                return;
            }
        }
        return (
            <Button className="mr-2" variant="info" onClick={() => this.handleSubmit()}>
                Откликнуться
            </Button>
        );
    }

    RenderData() {
        if (this.state.vacancyModal != null) {
            return (
                <div>
                    <h2>{this.state.vacancyModal.name}</h2>
                    <h4>Зарплата</h4>
                    <h5>от {this.state.vacancyModal.minSalary} до {this.state.vacancyModal.maxSalary} руб.</h5>
                    <h4>Должность</h4>
                    <h5>{this.state.vacancyModal.jobTitle}</h5>
                    <h5>Описание</h5>
                    <p>{this.state.vacancyModal.description}</p>
                    <h5>Страна</h5>
                    <p>{this.state.vacancyModal.country}</p>
                    <h5>Регион</h5>
                    <p>{this.state.vacancyModal.region}</p>
                    <h5>Номер телефона</h5>
                    <p>{this.state.vacancyModal.telephoneNumber}</p>
                    <h5>Требования</h5>
                    <p>{this.state.vacancyModal.requirements}</p>
                    <h5>Обязанности</h5>
                    <p>{this.state.vacancyModal.duties}</p>
                    <h5>Условия</h5>
                    <p>{this.state.vacancyModal.conditions}</p>
                    {this.RenderButton()}
                </div>
            )
        }
        return <h1>Данной вакансии нет</h1>;
    }

    render(){
        let isRedirect = this.state.isRedirect;
        if(isRedirect === true){
            return <Redirect to='/authentication' />
        }
        return (
            <div className="container">
                {this.RenderData()}
            </div>
        )
    }

}