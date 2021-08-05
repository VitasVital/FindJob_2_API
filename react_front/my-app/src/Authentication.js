import React,{Component} from 'react';
//import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {LoginModal} from './LoginModal';
import {RegistrationModal} from './RegistrationModal';

export class Authentication extends Component{

    constructor(props){
        super(props);
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + 'email'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
        let result = matches[1];
        this.state={loginModalShow:false, registrationModalShow:false, result}
        
    }

    render(){
        let loginModalClose=()=>this.setState({loginModalShow:false});
        let registrationModalClose=()=>this.setState({registrationModalShow:false});
        let showResult=()=>this.state.result !== undefined ? 'Вы вошли под логином ' + this.state.result : '';
        //придумать вывод имени из куки
        return(
            <div >
                <p>{showResult}</p>
                <ButtonToolbar>
                <Button variant='primary'
                    onClick={()=>this.setState({loginModalShow:true})}>
                    Войти</Button>

                    <Button variant='primary'
                    onClick={()=>this.setState({registrationModalShow:true})}>
                    Зарегистрироваться</Button>

                    <LoginModal show={this.state.loginModalShow}
                    onHide={loginModalClose}/>

                    <RegistrationModal show={this.state.registrationModalShow}
                    onHide={registrationModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}