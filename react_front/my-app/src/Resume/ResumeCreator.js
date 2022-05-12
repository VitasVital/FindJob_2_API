import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Table} from 'react-bootstrap';

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import queryString from 'query-string';
import Select from "react-select";
import {StockSalary, StockWorkExperience, StockWorkShedule, StockEmployment} from "../StockData";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";

export class ResumeCreator extends Component{
    constructor(props){
        super(props);
        this.state={
            jobTitle: '',
            Salary: '',
            EmploymentId: StockEmployment[0],
            Work_sheduleId: StockWorkShedule[0],
            Education: '',
            Work_experienceId: StockWorkExperience[0],

        }

        this.handleSubmit1=this.handleSubmit1.bind(this);
        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
    }

    componentDidMount() {
    }

    async handleSubmit1(event){
        let matches_id = document.cookie.match(new RegExp(
            "(?:^|; )" + 'id'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        let id_client = decodeURIComponent(matches_id[1]);

        await fetch(process.env.REACT_APP_API+'Client/CreateNewResume',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                clientId: Number(id_client),
                jobTitle: this.state.jobTitle,
                workScheduleId: Number(this.state.Work_sheduleId.value),
                employmentId: Number(this.state.EmploymentId.value),
                workExperienceId: Number(this.state.Work_experienceId.value),
                education: this.state.Education,
                salary: Number(this.state.Salary)
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

    handleInputChange1 = e => this.setState({ jobTitle: e.target.value });

    handleInputChange2 = e => this.setState({ Salary: e.target.value });

    handleInputChange3 = (EmploymentId) => {
        this.setState({ EmploymentId } );
    };

    handleInputChange4 = (Work_sheduleId) => {
        this.setState({ Work_sheduleId }, () =>
            console.log(`Option selected:`, this.state.Work_sheduleId)
        );
    };

    handleInputChange5 = e => this.setState({ Education: e.target.value });

    handleInputChange6 = (Work_experienceId) => {
        this.setState({ Work_experienceId }, () =>
            console.log(`Option selected:`, this.state.Work_experienceId)
        );
    };

    RenderData() {
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm" style={{ textAlign: "center" }}>
                    <tbody>
                    <tr>
                        <th>Название профессии</th>
                        <td>
                            <Form.Control type="text" placeholder = "Введите название профессии" value={this.state.jobTitle} onChange={ this.handleInputChange1 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Зарплата</th>
                        <td>
                            <Form.Control type="number" placeholder = "Введите зарплату" value={this.state.Salary} onChange={ this.handleInputChange2 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Занятость</th>
                        <td>
                            <Select
                                value={this.state.EmploymentId}
                                onChange={this.handleInputChange3}
                                options={StockEmployment}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>График работы</th>
                        <td>
                            <Select
                                value={this.state.Work_sheduleId}
                                onChange={this.handleInputChange4}
                                options={StockWorkShedule}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Образование</th>
                        <td>
                            <Form.Control type="text" placeholder = "Введите образование" value={this.state.Education} onChange={ this.handleInputChange5 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Опыт работы</th>
                        <td>
                            <Select
                                value={this.state.Work_experienceId}
                                onChange={this.handleInputChange6}
                                options={StockWorkExperience}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Создать резюме</th>
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