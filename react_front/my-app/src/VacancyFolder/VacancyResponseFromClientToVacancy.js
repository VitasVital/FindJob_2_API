import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Table} from 'react-bootstrap';

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import queryString from 'query-string';

export class VacancyResponseFromClientToVacancy extends Component{
    constructor(props){
        super(props);
        this.state={
            clientList: []
        }
    }

    componentDidMount() {
        const value = queryString.parse(this.props.location.search);
        const id_modal = value.id;
        fetch(process.env.REACT_APP_API +'Vacancy/GetResponseFromClientToVacancy/'+id_modal)
            .then(response => response.json())
            .then(data => this.setState({ clientList: data }));
    }

    RenderData() {
        return (
            <div>
                <h1>Список откликнувшихся соискателей</h1>
                <Table className="mt-4" striped bordered hover size="sm" style={{ textAlign: "center" }}>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Страна</th>
                        <th>Регион</th>
                        <th>Дата рождения</th>
                        <th>Пол</th>
                        <th>Номер телефона</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.clientList.map(dep=>
                        <tr key={dep.id}>
                            <td>{dep.name}</td>
                            <td>{dep.email}</td>
                            <td>{dep.country}</td>
                            <td>{dep.region}</td>
                            <td>{dep.dateBirth}</td>
                            <td>{dep.gender}</td>
                            <td>{dep.telephoneNumber}</td>
                            {/*<td>*/}
                            {/*    <Route render={({ history}) => (*/}
                            {/*        <Button className="mr-2" variant="info"*/}
                            {/*                onClick={() => { history.push( '/vacancyModal/?id=' + dep.vacancyId) }}>*/}
                            {/*            Просмотр вакансии*/}
                            {/*        </Button>*/}
                            {/*    )} />*/}
                            {/*</td>*/}
                            {/*<td>*/}
                            {/*    <Button className="mr-2" variant="info"*/}
                            {/*            onClick={()=>this.deleteResponce(dep.clientResponcesId)}>*/}
                            {/*        Посмотреть отклики*/}
                            {/*    </Button>*/}
                            {/*</td>*/}
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        );
    }

    render(){
        if (this.state.clientList.length === 0)
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