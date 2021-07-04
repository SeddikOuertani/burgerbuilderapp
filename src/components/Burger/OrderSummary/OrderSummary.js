import React, { Component } from 'react';
import classes from './OrderSummary.module.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    componentWillUpdate(){
        console.log("[OrderSummary.js] willUpdate");
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey=>{
            return <li key={igKey} >
                        <span style={{textTransform : 'capitalize'}}>
                            {igKey}
                        </span> : 
                        {this.props.ingredients[igKey]}
                    </li>
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A nice burger with these ingredients on</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p className={classes.PriceStyle}>
                        Total price :
                    <span className={classes.PriceContentStyle}>
                        {this.props.price.toFixed(2)}
                    </span>
                    $
                </p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>
        )
    }
}
 
export default OrderSummary;

