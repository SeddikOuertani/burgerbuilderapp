import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients : null,
    totalPrice : 4,
    error : false,    
}

const INGREDIENT_PRICES = {
    salad : 0.3,
    meat : 1.0,
    cheese : 0.7,
    bacon : 0.5,
}
//we can repeat this medthod of writing our Reducers in order to have a lean switch case
const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(action.ingredients, updatedIngredient);
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updatedState(state, updatedState);
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        //example of lean case
        case actionTypes.ADD_INGREDIENT : return addIngredient(state, action)

        case actionTypes.REMOVE_INGREDIENT : {
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        } 
        
        case actionTypes.SET_INGREDIENT : {
            return {
                ...state,
                ingredients : {
                    salad : action.ingredients.salad,
                    bacon : action.ingredients.bacon,
                    cheese : action.ingredients.cheese,
                    meat : action.ingredients.meat,
                },
                totalPrice : 4,
                error : false,
            }
        }
        
        case actionTypes.FETCH_INGREDIENTS_FAILED : {
            return {
                ...state,
                error : true,
            }
        }

        default : return state
    }
}
 
export default reducer;