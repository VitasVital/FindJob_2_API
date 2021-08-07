import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Client} from './Client';
import {Navigation} from './Navigation';
import { Vacancy } from './Vacancy';
import { Authentication } from './Authentication';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className = "m-3 d-flex justify-content-center">
        Веб-приложение по поиску работы
      </h3>
      <Navigation/>

      <Switch>
        <Route path ='/' component={Home} exact/>
        <Route path='/Client' component={Client}/>
        <Route path='/Vacancy' component={Vacancy}/>
        <Route path='/Authentication' component={Authentication}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
