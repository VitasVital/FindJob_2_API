import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Table} from 'react-bootstrap';

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import queryString from 'query-string';
import Select from "react-select";
import {StockSalary, StockWorkExperience, StockWorkShedule} from "../StockData";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";

export class VacancyCreator extends Component{
    constructor(props){
        super(props);
        this.state={
            Name: '',
            CompanyId: null,
            Description: '',
            TelephoneNumber: '',
            Job_title: '',
            Work_sheduleId: StockWorkShedule[0],
            Requirements: '',
            Duties: '',
            Conditions: '',
            Photo: '',
            Work_experienceId: StockWorkExperience[0],
            min_Salary: '',
            max_Salary: '',
            Country: '',
            Region: ''
        }

        this.handleSubmit1=this.handleSubmit1.bind(this);
        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
        this.handleInputChange3 = this.handleInputChange3.bind(this);
        this.handleInputChange4 = this.handleInputChange4.bind(this);
        this.handleInputChange5 = this.handleInputChange5.bind(this);
        this.handleInputChange6 = this.handleInputChange6.bind(this);
        this.handleInputChange7 = this.handleInputChange7.bind(this);
        this.handleInputChange8 = this.handleInputChange8.bind(this);
        this.handleInputChange9 = this.handleInputChange9.bind(this);
        this.handleInputChange10 = this.handleInputChange10.bind(this);
        this.handleInputChange11 = this.handleInputChange11.bind(this);
    }

    componentDidMount() {
    }

    async handleSubmit1(event){
        let matches_id = document.cookie.match(new RegExp(
            "(?:^|; )" + 'id'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        let id_client = decodeURIComponent(matches_id[1]);

        await fetch(process.env.REACT_APP_API+'login/GetUser/'+id_client)
            .then(response=>response.json())
            .then(data=>{
                this.setState({ CompanyId : data.companyId });
            });

        await fetch(process.env.REACT_APP_API+'Vacancy/CreateNewVacancy',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name: this.state.Name,
                companyId: this.state.CompanyId,
                description: this.state.Description,
                telephoneNumber: this.state.TelephoneNumber,
                jobTitle: this.state.Job_title,
                workScheduleId: Number(this.state.Work_sheduleId.value),
                requirements: this.state.Requirements,
                duties: this.state.Duties,
                conditions: this.state.Conditions,
                // Photo: '',
                workExperienceId: Number(this.state.Work_experienceId.value),
                minSalary: Number(this.state.min_Salary),
                maxSalary: Number(this.state.max_Salary),
                country: this.state.Country,
                region: this.state.Region
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

    handleInputChange1 = e => this.setState({ Name: e.target.value });

    handleInputChange2 = e => this.setState({ Description: e.target.value });

    handleInputChange3 = e => this.setState({ TelephoneNumber: e.target.value });

    handleInputChange4 = e => this.setState({ Job_title: e.target.value });

    handleInputChange5 = (Work_sheduleId) => {
        this.setState({ Work_sheduleId }, () =>
            console.log(`Option selected:`, this.state.Work_sheduleId)
        );
    };

    handleInputChange6 = e => this.setState({ Requirements: e.target.value });

    handleInputChange7 = e => this.setState({ Duties: e.target.value });

    handleInputChange8 = e => this.setState({ Conditions: e.target.value });

    handleInputChange9 = (Work_experienceId) => {
        this.setState({ Work_experienceId }, () =>
            console.log(`Option selected:`, this.state.Work_experienceId)
        );
    };

    handleInputChange10 = e => this.setState({ min_Salary: e.target.value });

    handleInputChange11 = e => this.setState({ max_Salary: e.target.value });

    selectCountry (val) {
        this.setState({ Country: val });
    }

    selectRegion (val) {
        this.setState({ Region: val });
    }

    RenderData() {
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm" style={{ textAlign: "center" }}>
                    <tbody>
                    <tr>
                        <th>Название вакансии</th>
                        <td>
                            <Form.Control type="text" placeholder = "Введите название вакансии" value={this.state.Name} onChange={ this.handleInputChange1 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Описание</th>
                        <td>
                            <Form.Control type="text" placeholder = "Введите описание" value={this.state.Description} onChange={ this.handleInputChange2 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Номер телефона</th>
                        <td>
                            <Form.Control type="tel" placeholder = "Введите номер телефона" value={this.state.TelephoneNumber} onChange={ this.handleInputChange3 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Должность</th>
                        <td>
                            <Form.Control type="text" placeholder = "Введите должность" value={this.state.Job_title} onChange={ this.handleInputChange4 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>График работы</th>
                        <td>
                            <Select
                                value={this.state.Work_sheduleId}
                                onChange={this.handleInputChange5}
                                options={StockWorkShedule}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Требования к кандидату</th>
                        <td>
                            <Form.Control type="text" placeholder = "Введите требования к кандидату" value={this.state.Requirements} onChange={ this.handleInputChange6 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Обязанности сотрудника</th>
                        <td>
                            <Form.Control type="text" placeholder = "Введите обязанности сотрудника" value={this.state.Duties} onChange={ this.handleInputChange7 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Условия работы</th>
                        <td>
                            <Form.Control type="text" placeholder = "Введите условия работы" value={this.state.Conditions} onChange={ this.handleInputChange8 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Опыт работы</th>
                        <td>
                            <Select
                                value={this.state.Work_experienceId}
                                onChange={this.handleInputChange9}
                                options={StockWorkExperience}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Минимальная зарплата</th>
                        <td>
                            <Form.Control type="number" placeholder = "Введите минимальную зарплату" value={this.state.min_Salary} onChange={ this.handleInputChange10 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Максимальная зарплата</th>
                        <td>
                            <Form.Control type="number" placeholder = "Введите максимальную зарплату" value={this.state.max_Salary} onChange={ this.handleInputChange11 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Страна</th>
                        <td>
                            <CountryDropdown
                                value={ this.state.Country }
                                name="citizenship"
                                onChange={(val) => this.selectCountry(val)} />
                        </td>
                    </tr>
                    <tr>
                        <th>Регион</th>
                        <td>
                            <RegionDropdown
                                country={ this.state.Country }
                                value={ this.state.Region }
                                name="city"
                                onChange={(val) => this.selectRegion(val)} />
                        </td>
                    </tr>
                    <tr>
                        <th>Создать вакансию</th>
                        <td>
                            <Button className="mr-2" variant="info"
                                    onClick={()=>this.handleSubmit1()}>
                                Создать
                            </Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

    render(){
        return (
            <div className="container">
                {this.RenderData()}
            </div>
        )
    }

}