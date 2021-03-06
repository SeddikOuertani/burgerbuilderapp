import axios from '../../axiosOrders';
import * as actionTypes from './actionTypes';

export const purchaceBurgerSuccess = (id, orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}

export const prchaseBurgerFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error,
    }
}

export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth='+ token, orderData)
            .then(response =>{
                console.log(response.data)
                dispatch(purchaceBurgerSuccess(response.data.name, orderData));
                this.props.history.push('/')
            }).catch(error => {
                dispatch(prchaseBurgerFail(error));
            })
    }
}

export const purchaseInit = () => {
    return{
        type : actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return{
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders ,
    }
}

export const fetchOrdersFail = (error) => {
    return{
        type : actionTypes.FETCH_ORDERS_FAIL,
        error : error
    }
}

export const fetchOrdersStart = () => {
    return{
        type : actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token) => {
    return dispatch => { 
        dispatch(fetchOrdersStart())
        axios.get('/orders.json?auth='+token)
            .then(response=>{
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id : key, 
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            }).catch(err=>{
                dispatch(fetchOrdersFail(err))
            })
    }
}