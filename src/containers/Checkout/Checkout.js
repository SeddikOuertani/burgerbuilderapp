import React, { Component } from 'react';
import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to="/" />
        if(this.props.ingredients){
            const purchacedRedirect = this.props.purchased ? <Redirect to="/burgerbuilderapp"/> : null
            summary = (
                <div>
                    {purchacedRedirect}
                    <CheckoutSummary 
                        continueClicked={this.continueHandler} 
                        cancelClicked={this.cancelHandler} 
                        ingredients={this.props.ingredients}
                    />
                    <Route 
                        path={this.props.match.path+'/contact-data'} 
                        component={ContactData}
                    />
                </div>
            )
        }

        return ( 
            <div>
                {summary}
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        purchased : state.order.purchased,
    }
}

export default connect(mapStateToProps)(Checkout);