import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

export class Client extends Component {

    constructor(props) {
        super(props);
        this.state={deps:[]}
    }

    refreshList() {
        fetch(process.env.REACT_APP_API+'client')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    render() {
        const {deps}=this.state;
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                        </th>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.Id}>
                                <td>{dep.Id}</td>
                                <td>{dep.Name}</td>
                                <td>{dep.Email}</td>
                                <td>{dep.Password}</td>
                                <td>Edit / Delete</td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}