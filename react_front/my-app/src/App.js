import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Navigation} from './Navigation';
import { Vacancy } from './VacancyFolder/Vacancy';
import { Authentication } from './ClientFolder/Authentication';
import {VacancyModal} from "./VacancyFolder/VacancyModal";
import {ResponseClient} from "./ClientFolder/ResponseClient";
import {VacancyListClient} from "./ClientFolder/VacancyListClient";
import {VacancyCreator} from "./VacancyFolder/VacancyCreator";
import {VacancyResponseFromClientToVacancy} from "./VacancyFolder/VacancyResponseFromClientToVacancy";

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
        <Route path='/Vacancy' component={Vacancy}/>
        <Route path='/Authentication' component={Authentication}/>
        <Route path='/VacancyModal' component={VacancyModal}/>
        <Route path='/ResponseClient' component={ResponseClient}/>
        <Route path='/VacancyListClient' component={VacancyListClient}/>
        <Route path='/VacancyCreator' component={VacancyCreator}/>
        <Route path='/VacancyResponseFromClientToVacancy' component={VacancyResponseFromClientToVacancy}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
