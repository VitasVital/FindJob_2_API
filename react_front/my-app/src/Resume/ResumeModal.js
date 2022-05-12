import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import queryString from 'query-string';

export class ResumeModal extends Component{
    constructor(props){
        super(props);
        this.state={
            resumeClient: null
        }
    }

    componentDidMount() {
        const id_modal = queryString.parse(this.props.location.search).clientId;
        fetch(process.env.REACT_APP_API+'client/GetResume/'+id_modal)
            .then(response=>response.json())
            .then(data=>{ this.setState({resumeClient: data})});
    }

    RenderData() {
        if (this.state.resumeClient !== null) {
            return (
                <div>
                    <h1>{this.state.resumeClient.jobTitle}</h1>
                    <h2>{this.state.resumeClient.name}</h2>
                    <h4>Зарплата</h4>
                    <p>{this.state.resumeClient.salary} руб.</p>
                    <h4>Дата рождения</h4>
                    <p>{this.state.resumeClient.dateBirth}</p>
                    <h4>Email</h4>
                    <p>{this.state.resumeClient.email}</p>
                    <h4>Образование</h4>
                    <p>{this.state.resumeClient.education}</p>
                    <h4>Пол</h4>
                    <p>{this.state.resumeClient.gender}</p>
                    <h4>Страна</h4>
                    <p>{this.state.resumeClient.country}</p>
                    <h4>Регион</h4>
                    <p>{this.state.resumeClient.region}</p>
                    <h4>Номер телефона</h4>
                    <p>{this.state.resumeClient.telephoneNumber}</p>
                    <h4>Опыт работы</h4>
                    <p>{this.state.resumeClient.workExperienceName}</p>
                    <h4>Тип занятости</h4>
                    <p>{this.state.resumeClient.employmentName}</p>
                    <h4>График работы</h4>
                    <p>{this.state.resumeClient.workScheduleName}</p>
                    <p>
                        <Route render={({ history}) => (
                            <Button className="mr-2" variant="info" onClick={() => { history.push( '/ResumeCreator/?resumeId=' + this.state.resumeClient.resumeId) }}>
                                Редактировать резюме
                            </Button>
                        )} />
                    </p>
                </div>
            )
        }
        return <h1>Данного резюме нет</h1>;
    }

    render(){
        return (
            <div className="container">
                {this.RenderData()}
            </div>
        )
    }

}