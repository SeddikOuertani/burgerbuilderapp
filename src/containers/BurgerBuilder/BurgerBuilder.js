import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axiosOrders';
import * as actions from '../../store/actions/index';
var lodash = require('lodash');

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchacing : false,
        }
    }

    
    
    componentDidMount(){
        this.props.onInitIngredients()
    }

    updatePurchaseState = () => {
       return lodash.sum((Object.values(this.props.ingredients))) === 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchacing : true}); 
        }else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchacing : false})
    }

    purchaceContinueHandler = () => {
        // this is code for how you pass query params from page to page
        // const queryParams = []
        // for( let i in this.state.ingredients ){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push("price="+this.state.totalPrice)
        // const queryString = queryParams.join('&');
        
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }

 

    render() { 

        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        let orderBtnText = "Sign In to order";
        if( this.props.isAuthenticated) {
            orderBtnText = "Order Now"
        }
        

        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    
                    <BuildControls
                        ordered={this.purchaseHandler}
                        purchaseDisabled={this.updatePurchaseState()}
                        price = {this.props.totalPrice}
                        ingredientRemoved={this.props.onRemoveIngredients}
                        ingredientAdded={this.props.onAddIngredients}
                        disabled={disabledInfo}
                        orderBtnText={orderBtnText}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                    
                </Aux>
            );
            
            orderSummary = (
                <OrderSummary
                    price={this.props.totalPrice}
                    ingredients={this.props.ingredients}
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

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients : (ingName) => dispatch(actions.addIngredient(ingName)),
        onRemoveIngredients : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredient()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));