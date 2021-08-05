import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import { ShowVacancyModal } from './ShowVacancyModal';

export class Vacancy extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], showModalShow:false}
        //document.cookie = "user=John"
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'vacancy')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {deps, depid,depname,depsalary,depdescription}=this.state;
        let showModalClose=()=>this.setState({showModalShow:false});
        return(
            <div >
                <h1>Список вакансий</h1>
                <Table className="mt-4" striped bordered hover size="sm">
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
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({showModalShow:true,
                                                depid:dep.id,
                                                depname:dep.name,
                                                depsalary:dep.salary,
                                                depdescription:dep.description})}>
                                                    Проссмотр
                                        </Button>
                                        <ShowVacancyModal show={this.state.showModalShow}
                                            onHide={showModalClose}
                                            depid={depid}
                                            depname={depname}
                                            depsalary={depsalary}
                                            depdescription={depdescription}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}