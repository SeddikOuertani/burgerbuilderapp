import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad : 0.3,
    meat : 1.0,
    cheese : 0.7,
    bacon : 0.5
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients : {
                salad : 0,
                bacon : 0,
                cheese : 0,
                meat : 0, 
            },

            totalPrice : 4,
            purchaseDisabled : true,
            purchacing : false,
        }
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients : updatedIngredient,
            totalPrice : newPrice
        });
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount<=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients : updatedIngredient,
            totalPrice : newPrice
        });
        this.updatePurchaseState(updatedIngredient);
    }

    updatePurchaseState (ingredients) {
        const arrVal = Object.values(ingredients);
        let s=0;
        for (let i =0 ; i < arrVal.length; i++){
            s = s+arrVal[i];
        }
        console.log('Sum =' + s+', sum type : '+typeof(s))
        this.setState({purchaseDisabled : s === 0})
    }

    purchaseHandler = () =>{
        this.setState({purchacing : true}); 
    }

    purchaseCancelHandler = () =>{
        this.setState({purchacing : false})
    }

    purchaceContinueHandler(){
        alert('You continued!');
    }

    render() { 

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return ( 
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchacing}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaceContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ordered={this.purchaseHandler}
                    purchaseDisabled={this.state.purchaseDisabled}
                    price = {this.state.totalPrice}
                    ingredientRemoved={this.removeIngredientHandler} 
                    ingredientAdded={this.addIngredientHandler}
                    disabled={disabledInfo}
                />
            </Aux> 
        );
    }
}
 
export default BurgerBuilder;