import Layout from './hoc/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';
import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/orders/Orders';

class App extends Component{

    render(){
        return (
            <div> 
                <Layout>
                    <Switch>
                        <Redirect from="/burgerbuilderapp/" to="/"/>
                        <Route path='/checkout' component={Checkout}/>
                        <Route path='/Orders' component={Orders}/>                        
                        <Route path='/' exact component={BurgerBuilder}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}
  


export default App;
