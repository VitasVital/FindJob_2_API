import React,{Component} from 'react';
import {Form, Table} from 'react-bootstrap';

import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import Select from 'react-select';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {StockVacancies, StockSalary, StockWorkExperience, StockWorkShedule} from "../StockData";

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export class Vacancy extends Component{

    constructor(props){
        super(props);
        this.state={
            // deps:[],
            deps: StockVacancies,
            showModalShow:false,

            inputSearch: '',

            optionSelected_salary: '',
            optionSelected_experience: '',
            optionSelected_shedule: '',

            country: '',
            region: ''
        }

        this.handleSubmit1=this.handleSubmit1.bind(this);
        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);
        this.handleInputChange3 = this.handleInputChange3.bind(this);
        this.handleInputChange4 = this.handleInputChange4.bind(this);
        this.handleInputChange5 = this.handleInputChange5.bind(this);
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'vacancy')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        // this.refreshList();
    }

    componentDidUpdate(){
        // this.refreshList();
    }

    handleSubmit1(event){
        fetch(process.env.REACT_APP_API + '/sneakersProject/SneakersServlet?m=searchByFilters',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                inputSearch: this.state.inputSearch === '' ? [] : this.state.inputSearch,
                optionSelected_salary: this.state.optionSelected_salary === '' ? [] : this.state.optionSelected_salary,
                optionSelected_experience: this.state.optionSelected_experience === '' ? [] : this.state.optionSelected_experience,
                optionSelected_shedule: this.state.optionSelected_shedule === '' ? [] : this.state.optionSelected_shedule,
                country: this.state.country === '' ? [] : this.state.country,
                region: this.state.region === '' ? [] : this.state.region
            })
        })
        .then(res=>res.json())
        .then((result)=>{
                this.setState({deps:result});
            },
            (error)=>{
                // alert('При открпвке на сервер 2');
            })
    }

    handleInputChange1 = (optionSelected_salary) => {
        this.setState({ optionSelected_salary }, () =>
            console.log(`Option selected:`, this.state.optionSelected_salary)
        );
    };

    handleInputChange2 = (optionSelected_experience) => {
        this.setState({ optionSelected_experience }, () =>
            console.log(`Option selected:`, this.state.optionSelected_experience)
        );
    };

    handleInputChange3(event) {
        this.setState({inputSearch: event.target.inputSearch});
    }

    handleInputChange4 = (optionSelected_shedule) => {
        this.setState({ optionSelected_shedule }, () =>
            console.log(`Option selected:`, this.state.optionSelected_shedule)
        );
    };

    handleInputChange5(event) {
        this.setState({ inputSearch: '' });
        this.setState({ optionSelected_salary: '' });
        this.setState({ country: '' });
        this.setState({ region: '' });
        this.setState({ optionSelected_experience: '' });
        this.setState({ optionSelected_shedule: '' });
    }

    selectCountry (val) {
        this.setState({ country: val });
    }

    selectRegion (val) {
        this.setState({ region: val });
    }

    render(){
        const {deps}=this.state;
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm" style={{ textAlign: "center" }}>
                    <tbody>
                    <tr>
                        <th>Поиск</th>
                        <td>
                            <Form.Control type="text" placeholder = "Профессия, должность или компания" value={this.state.inputSearch} onChange={ this.handleInputChange3 }/>
                        </td>
                    </tr>
                    <tr>
                        <th>Уровень дохода</th>
                        <td>
                            <Select
                                value={this.state.optionSelected_salary}
                                onChange={this.handleInputChange1}
                                options={StockSalary}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Страна</th>
                        <td>
                            <CountryDropdown
                                value={ this.state.country }
                                name="citizenship"
                                onChange={(val) => this.selectCountry(val)} />
                        </td>
                    </tr>
                    <tr>
                        <th>Регион</th>
                        <td>
                            <RegionDropdown
                                country={ this.state.country }
                                value={ this.state.region }
                                name="city"
                                onChange={(val) => this.selectRegion(val)} />
                        </td>
                    </tr>
                    <tr>
                        <th>Опыт работы</th>
                        <td>
                            <Select
                                value={this.state.optionSelected_experience}
                                onChange={this.handleInputChange2}
                                options={StockWorkExperience}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>График работы</th>
                        <td>
                            <Select
                                value={this.state.optionSelected_shedule}
                                onChange={this.handleInputChange4}
                                options={StockWorkShedule}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Отправить</th>
                        <td>
                            <Button className="mr-2" variant="info"
                                    onClick={()=>this.handleSubmit1()}>
                                Найти
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <th>Сбросить фильтр</th>
                        <td>
                            <Button className="mr-2" variant="danger"
                                    onClick={()=>this.handleInputChange5()}>
                                Сбросить фильтр
                            </Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <h1>Список вакансий</h1>
                <Table className="mt-4" striped bordered hover size="sm" style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th>Специальность</th>
                            <th>Зарплата</th>
                            <th>Описание профессии</th>
                            <th>Проссмотр</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.id}>
                                <td>{dep.name}</td>
                                <td>{dep.salary}</td>
                                <td>{dep.description}</td>
                                <td>
                                    <Route render={({ history}) => (
                                        <Button className="mr-2" variant="info" onClick={() => { history.push( '/vacancyModal/?id=' + dep.id) }}>
                                            Проссмотр
                                        </Button>
                                    )} />
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}