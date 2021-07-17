import * as actionTypes from './actionTypes'
import axios from '../../axiosOrders';
export const addIngredient = (ingName) => {
    return {
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : ingName
    }
}

export const setIngredient = (ingredients) => {
    return{
        type : actionTypes.SET_INGREDIENT,
        ingredients : ingredients
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://reactburgerbuilder-9c2d0-default-rtdb.firebaseio.com/ingredients.json')
        .then(response =>{
            dispatch(setIngredient(response.data));
        }).catch(error =>{
            dispatch(fetchIngredientsFailed());
        })

    }
}

export const fetchIngredientsFailed = () =>{
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED
    }
}