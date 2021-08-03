import Layout from './hoc/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';
import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/logout/logout';


class App extends Component{

    render(){
        return (
            <div> 
                <Layout>
                    <Switch>
                        <Route path='/checkout' component={Checkout}/>
                        <Route path='/Orders' component={Orders}/>       
                        <Route path='/Auth' component={Auth}/>      
                        <Route path='/logout' exact component={Logout}/>   
                        <Route path='/' exact component={BurgerBuilder}/>      
                    </Switch>
                </Layout>
            </div>
        );
    }
}
  


export default App;
