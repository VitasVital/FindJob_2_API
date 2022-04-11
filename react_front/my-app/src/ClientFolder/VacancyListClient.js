import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Table} from 'react-bootstrap';

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import queryString from 'query-string';

export class VacancyListClient extends Component{
    constructor(props){
        super(props);
        this.state={
            vacancyList: []
        }
    }

    componentDidMount() {
        let matches_id = document.cookie.match(new RegExp(
            "(?:^|; )" + 'id'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        let id_client = decodeURIComponent(matches_id[1]);

        fetch(process.env.REACT_APP_API +'Vacancy/GetClientVacancies/'+id_client)
            .then(response => response.json())
            .then(data => this.setState({ vacancyList: data }));
    }

    RenderData() {
        return (
            <div>
                <h1>Список активных вакансий</h1>
                <Table className="mt-4" striped bordered hover size="sm" style={{ textAlign: "center" }}>
                    <thead>
                    <tr>
                        <th>Специальность</th>
                        <th>Компания</th>
                        <th>Регион</th>
                        <th>Зарплата</th>
                        <th>Описание профессии</th>
                        <th>Опыт работы</th>
                        <th>Просмотр вакансии</th>
                        <th>Отмена отклика</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.vacancyList.map(dep=>
                        <tr key={dep.id}>
                            <td>{dep.name}</td>
                            <td>{dep.companyName}</td>
                            <td>{dep.region}</td>
                            <td>{dep.minSalary} руб. до {dep.maxSalary} руб.</td>
                            <td>{dep.description}</td>
                            <td>{dep.workExperience}</td>
                            <td>
                                <Route render={({ history}) => (
                                    <Button className="mr-2" variant="info"
                                            onClick={() => { history.push( '/vacancyModal/?id=' + dep.vacancyId) }}>
                                        Просмотр вакансии
                                    </Button>
                                )} />
                            </td>
                            <td>
                                <Route render={({ history}) => (
                                    <Button className="mr-2" variant="info"
                                            onClick={() => { history.push( '/VacancyResponseFromClientToVacancy/?id=' + dep.vacancyId) }}>
                                        Посмотреть отклики
                                    </Button>
                                )} />
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        );
    }

    render(){
        if (this.state.vacancyList.length === 0)
        {
            return (
                <div className="container">
                    <h1>Нет активных вакансий</h1>
                </div>
            )
        }
        return (
            <div className="container">
                {this.RenderData()}
            </div>
        )
    }

}