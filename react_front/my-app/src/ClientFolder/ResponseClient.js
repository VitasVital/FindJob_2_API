import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Table} from 'react-bootstrap';

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import queryString from 'query-string';
import {StockWorkShedule} from "../StockData";

export class ResponseClient extends Component{
    constructor(props){
        super(props);
        this.deleteResponce=this.deleteResponce.bind(this);
        this.state={
            vacancyList: []
        }
    }

    componentDidMount() {
        const value = queryString.parse(this.props.location.search);
        const id_client = value.id;
        fetch(process.env.REACT_APP_API +'Client/GetResponcesClient/'+id_client)
            .then(response => response.json())
            .then(data => this.setState({ vacancyList: data }));
    }

    deleteResponce(idResponce){
        fetch(process.env.REACT_APP_API+'Client/DeleteResponceClient/'+idResponce,{
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

    RenderData() {
        if (this.state.vacancyList.length !== 0)
        {
            return (
                <div>
                    <h1>Список откликов</h1>
                    <Table className="mt-4" striped bordered hover size="sm" style={{ textAlign: "center" }}>
                        <thead>
                        <tr>
                            <th>Принятие отклика</th>
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
                                <th>{dep.isAccepted}</th>
                                <td>{dep.name}</td>
                                <td>{dep.companyName}</td>
                                <td>{dep.region}</td>
                                <td>{dep.minSalary} руб. до {dep.maxSalary} руб.</td>
                                <td>{dep.description}</td>
                                <td>{dep.workExperience}</td>
                                <td>
                                    <Route render={({ history}) => (
                                        <Button className="mr-2" variant="info" onClick={() => { history.push( '/vacancyModal/?id=' + dep.vacancyId) }}>
                                            Просмотр вакансии
                                        </Button>
                                    )} />
                                </td>
                                <td>
                                    <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteResponce(dep.clientResponcesId)}>
                                        Отменить отклик
                                    </Button>
                                </td>
                            </tr>)}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }

    render(){
        if (this.state.vacancyList.length === 0)
        {
            return (
                <div className="container">
                    <h1>Нет откликов</h1>
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