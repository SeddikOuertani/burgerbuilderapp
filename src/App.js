import Layout from './hoc/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';
import React, { Component } from 'react';

class App extends Component{

    render(){
        return (
            <div >
                <Layout>
                    <BurgerBuilder />
                </Layout>
            </div>
        );
    }
}
  


export default App;