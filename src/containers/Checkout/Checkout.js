import React, { Component } from 'react';
import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from '../contactData/ContactData';

class Checkout extends Component {
  
    cancelHandler = () =>{
        this.props.history.goBack();
    }

    continueHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render() { 
        return ( 
            <div>
                <CheckoutSummary 
                    continueClicked={this.continueHandler} 
                    cancelClicked={this.cancelHandler} 
                    ingredients={this.props.ingredients}
                />
                <Route 
                    path={this.props.match.path+'/contact-data'} 
                    component={ContactData}/>
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ingredients : state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);