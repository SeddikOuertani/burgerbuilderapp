import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENT_PRICES = {
    salad : 0.3,
    meat : 1.0,
    cheese : 0.7,
    bacon : 0.5,
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ingredients : null,
            totalPrice : 4,
            purchaseDisabled : true,
            purchacing : false,
            loading : false,
            error : false,
        }
    }

    componentDidMount(){
        axios.get('https://reactburgerbuilder-9c2d0-default-rtdb.firebaseio.com/ingredients.json')
            .then(response =>{
                this.setState({
                    ingredients : response.data
                })
            }).catch(error =>{
                console.log(error);
                this.setState({error : true})
            })
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
        this.setState({purchaseDisabled : s === 0})
    }

    purchaseHandler = () =>{
        this.setState({purchacing : true}); 
    }

    purchaseCancelHandler = () =>{
        this.setState({purchacing : false})
    }

    purchaceContinueHandler = () =>{
        
        const queryParams = []
        for( let i in this.state.ingredients ){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price="+this.state.totalPrice)
        const queryString = queryParams.join('&');
        

        this.props.history.push({
            pathname : '/checkout',
            search : '?'+ queryString,
        })
    }

 

    render() { 

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if(this.state.ingredients){
            burger = (
                <Aux>
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
            
            orderSummary = (
                <OrderSummary
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaceContinueHandler}
                />
            )
        }

    
        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchacing}>
                    {orderSummary}                    
                </Modal>
                {burger}
            </Aux> 
        );
    }
}
 
export default withErrorHandler(BurgerBuilder, axios);