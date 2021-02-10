import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import DeliverymanResgiter from './Pages/DeliverymanRegister';
import DeliverymenList from './Pages/DeliverymenList';
import PersonCard from './components/personCard/';
import{Students} from './students';


const App = () => {
        return (
            <>
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/deliveryman' component={DeliverymanResgiter}/>
                        <Route path='/deliverymenList' component={DeliverymenList}/>
                    </Switch>
                </HashRouter>

                {/*<h1>lista de estudantes</h1>
                    <ul>
                        {Students.map((student, index) => {
                            return(
                                <li key={index.toString()}>
                                    <PersonCard name={student.name} email={student.email} />
                                </li>
                            );
                        })}
                        
                    </ul>*/}
            </>
        );
}
