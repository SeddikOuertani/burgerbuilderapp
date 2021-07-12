import React, { Component } from 'react';
import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../contactData/ContactData';

class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients : null,
            totalPrice : 0,
        }
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries() ){
            // param = ['salad' : 1]
            if(param[0]=== 'price'){
                price= param[1]

            }else{
                ingredients[param[0]] = +param[1] ;
            }
        }
        this.setState({
            ingredients : ingredients,
            totalPrice : price
        })

    }

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
                    ingredients={this.state.ingredients}
                />
                <Route 
                    path={this.props.match.path+'/contact-data'} 
                    render={(props)=>(
                        <ContactData 
                            ingredients={this.state.ingredients} 
                            price={this.state.totalPrice}
                            {...props}
                        />)}
                />
            </div>
         );
    }
}
 
export default Checkout;