import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {LoginModal} from './LoginModal';
import {RegistrationModal} from './RegistrationModal';
import { EditAuthenticationModal } from './EditAuthenticationModal';
import {Route} from "react-router-dom";

export class Authentication extends Component{

    constructor(props){
        super(props);
        this.state={
            deps: [],
            dateBirthHelp: '',
            loginModalShow:false,
            registrationModalShow:false,
            editModalShow:false,
            resumeClient: null
        }
    }

    RoleButtons() {
        if (this.state.deps.role_Id === 2 && this.state.resumeClient !== null)
        {
            return (
                <div>
                    <p>
                        <Route render={({ history}) => (
                            <Button className="mr-2" variant="info" onClick={() => { history.push( '/ResumeModal/?clientId=' + this.state.deps.id) }}>
                                Посмотреть резюме
                            </Button>
                        )} />
                    </p>
                    <p>
                        <Route render={({ history}) => (
                            <Button className="mr-2" variant="info" onClick={() => { history.push( '/responseClient/?id=' + this.state.deps.id) }}>
                                Просмотр откликов
                            </Button>
                        )} />
                    </p>
                </div>
            )
        }
        if (this.state.deps.role_Id === 2 && this.state.resumeClient === null)
        {
            return (
                <div>
                    <p>
                        <Route render={({ history}) => (
                            <Button className="mr-2" variant="info" onClick={() => { history.push( '/ResumeCreator') }}>
                                Создать резюме
                            </Button>
                        )} />
                    </p>
                    <p>
                        <Route render={({ history}) => (
                            <Button className="mr-2" variant="info" onClick={() => { history.push( '/responseClient/?id=' + this.state.deps.id) }}>
                                Просмотр откликов
                            </Button>
                        )} />
                    </p>
                </div>
            )
        }
        return (
            <div>
                <p>
                    <Route render={({ history}) => (
                        <Button className="mr-2" variant="info"
                                onClick={() => { history.push( '/VacancyCreator') }}>
                            Создать вакансию
                        </Button>
                    )} />
                </p>
                <p>
                    <Route render={({ history}) => (
                        <Button className="mr-2" variant="info" onClick={() => { history.push( '/VacancyListClient') }}>
                            Просмотр активных вакансий
                        </Button>
                    )} />
                </p>
            </div>
        )
    }

    ClientInformation() {

        return (
            <div>
                <h3></h3>
                <p>
                    <Button className="mr-2" variant="danger" style={{visibility: this.visibility(this.checkClientInformation()) }}
                            onClick={()=>this.exitAccount()}>Выйти из аккаунта</Button>
                </p>

                <p>
                    <Button className="mr-2" variant="info" style={{visibility: this.visibility(this.checkClientInformation()) }}
                            onClick={()=>this.setState({editModalShow:true})}>Редактировать профиль</Button>
                </p>
                <h3>Информация об авторизованном пользователе</h3>
                <Table className="mt-4" striped bordered hover size="sm">
                    <tbody>
                    <tr >
                        <th scope="row">Имя</th>
                        <td>{this.state.deps.name}</td>
                    </tr>
                    <tr >
                        <th scope="row">Email</th>
                        <td>{this.state.deps.email}</td>
                    </tr>
                    <tr >
                        <th scope="row">Страна</th>
                        <td>{this.state.deps.country}</td>
                    </tr>
                    <tr >
                        <th scope="row">Регион</th>
                        <td>{this.state.deps.region}</td>
                    </tr>
                    <tr >
                        <th scope="row">Дата рождения</th>
                        <td>{this.state.deps.dateBirth}</td>
                    </tr>
                    <tr >
                        <th scope="row">Номер телефона</th>
                        <td>{this.state.deps.telephoneNumber}</td>
                    </tr>
                    <tr >
                        <th scope="row">Роль на сайте</th>
                        <td>{this.state.deps.role_Name}</td>
                    </tr>
                    </tbody>
                </Table>

                { this.RoleButtons() }
            </div>
        )
    }

    Greeting() {
        if (this.checkClientInformation()) {
            return this.ClientInformation();
        }
        return (
            <div>
                <h3>Зарегистрируйтесь или авторизуйтесь</h3>
                <p>
                    <Button variant='primary' style={{visibility: this.visibility(!this.checkClientInformation()) }}
                            onClick={()=>this.setState({loginModalShow:true})}>Войти</Button>
                </p>
                <p>
                    <Button variant='primary' style={{visibility: this.visibility(!this.checkClientInformation()) }}
                            onClick={()=>this.setState({registrationModalShow:true})}>Зарегистрироваться</Button>
                </p>
            </div>);
    }

    async refreshList(id){
        await fetch(process.env.REACT_APP_API+'login/GetUser/'+id)
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
        await fetch(process.env.REACT_APP_API+'client/GetResume/'+this.state.deps.id)
            .then(response=>response.json())
            .then(data=>{
                this.setState({resumeClient: data});
            });
    }

    checkCookie() {
        let matches_id = document.cookie.match(new RegExp(
            "(?:^|; )" + 'id'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));

        if (matches_id)
        {
            let id = decodeURIComponent(matches_id[1]);
            this.refreshList(id);
        }
    }

    componentDidMount(){
        this.checkCookie();
    }

    exitAccount(){
        let matches_id = document.cookie.match(new RegExp(
            "(?:^|; )" + 'id'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        if(window.confirm('Вы действительно хотите выйти из аккаунта?')){
            document.cookie = `id=${matches_id};max-age=0`;
        }
        window.location.reload();
    }

    checkClientInformation() {
        let matches_id = document.cookie.match(new RegExp(
            "(?:^|; )" + 'id'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
        return matches_id;
    }

    visibility(showInformation) {
        return showInformation ? 'visible' : 'hidden';
    }

    render(){
        const {deps}=this.state;
        let loginModalClose=()=>{
            this.setState({loginModalShow:false});
            window.location.reload();
        };
        let registrationModalClose=()=>this.setState({registrationModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        let showInformation = this.checkClientInformation();
        return(
            <div >
                <EditAuthenticationModal show={this.state.editModalShow}
                    onHide={editModalClose}
                    style={{visibility: this.visibility(showInformation) }}
                    deps={deps}/>

                <LoginModal show={this.state.loginModalShow}
                onHide={loginModalClose}/>

                <RegistrationModal show={this.state.registrationModalShow}
                onHide={registrationModalClose}/>

                { this.Greeting() }
            </div>
        )
    }
}