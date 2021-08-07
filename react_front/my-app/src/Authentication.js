import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {LoginModal} from './LoginModal';
import {RegistrationModal} from './RegistrationModal';
import { EditAuthenticationModal } from './EditAuthenticationModal';

function ClientInformation(props) {
    return (
        <div>
            <h3>Информация об авторизованном пользователе</h3>
                <Table className="mt-4" striped bordered hover size="sm">
                    <tbody>
                            <tr >
                                <th scope="row">Имя</th>
                                <td>{props.deps.name}</td>
                            </tr>
                            <tr >
                                <th scope="row">Email</th>
                                <td>{props.deps.email}</td>
                            </tr>
                            <tr >
                                <th scope="row">Гражданство</th>
                                <td>{props.deps.citizenship}</td>
                            </tr>
                            <tr >
                                <th scope="row">Город</th>
                                <td>{props.deps.city}</td>
                            </tr>
                            <tr >
                                <th scope="row">Дата рождения</th>
                                <td>{props.deps.dateBirth}</td>
                            </tr>
                            <tr >
                                <th scope="row">Номер телефона</th>
                                <td>{props.deps.telephoneNumber}</td>
                            </tr>
                            <tr >
                                <th scope="row">Роль на сайте</th>
                                <td>{props.deps.role}</td>
                            </tr>
                    </tbody>
                </Table>
        </div>
    )
}

function Greeting(props) {
    const deps = props.deps;
    const clientInformation = props.clientInformation;
    if (clientInformation) {
      return <ClientInformation deps={deps} />;
    }
    return <h3>Тут будет Информация об авторизованном пользователе</h3>;
  }

export class Authentication extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], loginModalShow:false, registrationModalShow:false, editModalShow:false}
        
    }

    refreshList(email, pass){
        fetch(process.env.REACT_APP_API+'login/'+email+'/'+pass)
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
        document.cookie = "id" + "=" + encodeURIComponent(this.state.deps.id);
    }

    checkCookie() {
        let matches_email = document.cookie.match(new RegExp(
            "(?:^|; )" + 'email'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
          let matches_pass = document.cookie.match(new RegExp(
            "(?:^|; )" + 'password'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
        if (matches_email && matches_pass) 
        {
            let email = decodeURIComponent(matches_email[1]);
            let pass = decodeURIComponent(matches_pass[1]);
            this.refreshList(email, pass);
        }
    }

    componentDidMount(){
        this.checkCookie();
    }

    componentDidUpdate(){
        this.checkCookie();
    }

    exitAccount(id, email, pass){
        if(window.confirm('Вы действительно хотите выйти из аккаунта?')){
            document.cookie = "id=" + {id} + ";" + "max-age=0";
            document.cookie = "email=" + {email} + ";" + "max-age=0";
            document.cookie = "password=" + {pass} + ";" + "max-age=0";
        }
    }

    checkClientInformation() {
        let matches_email = document.cookie.match(new RegExp(
            "(?:^|; )" + 'email'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
        let matches_pass = document.cookie.match(new RegExp(
        "(?:^|; )" + 'password'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches_email && matches_pass;
    }

    visibility(showInformation) {
        return showInformation ? 'visible' : 'hidden';
    }

    render(){
        const {deps}=this.state;
        let loginModalClose=()=>this.setState({loginModalShow:false});
        let registrationModalClose=()=>this.setState({registrationModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        let showInformation = this.checkClientInformation();
        let autentificatedVisibility = this.visibility(showInformation);
        let notAutentificatedVisibility = this.visibility(!showInformation);
        return(
            <div >
                <ButtonToolbar>
                <Button variant='primary' style={{visibility: notAutentificatedVisibility }}
                    onClick={()=>this.setState({loginModalShow:true})}>
                    Войти</Button>

                    <Button variant='primary' style={{visibility: notAutentificatedVisibility }}
                    onClick={()=>this.setState({registrationModalShow:true})}>
                    Зарегистрироваться</Button>

                    <Button className="mr-2" variant="danger" style={{visibility: autentificatedVisibility }}
                                        onClick={()=>this.exitAccount(deps.id, deps.email, deps.password)}>
                                        Выйти из аккаунта</Button>

                    <Button className="mr-2" variant="info" style={{visibility: autentificatedVisibility }}
                                        onClick={()=>this.setState({editModalShow:true,
                                            deps:deps})}>
                                                Редактировать профиль</Button>

                    <EditAuthenticationModal show={this.state.editModalShow}
                        onHide={editModalClose}
                        style={{visibility: autentificatedVisibility }}
                        deps={deps}/>
                    
                    <LoginModal show={this.state.loginModalShow}
                    onHide={loginModalClose}/>

                    <RegistrationModal show={this.state.registrationModalShow}
                    onHide={registrationModalClose}/>
                    
                </ButtonToolbar>
                <Greeting deps={deps} clientInformation={showInformation}/>
            </div>
        )
    }
}