import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (idtoken, userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : idtoken,
        userId : userId
    }
}

export const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeOut = (expirationCode) => {
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
            console.log("expiration time : "+ expirationCode)
        }, expirationCode * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        //...authenticate 
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAp2a27fp9MYS-qVwH-ARNSV5VZdXdv1oY";
        if(!isSignUp){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAp2a27fp9MYS-qVwH-ARNSV5VZdXdv1oY"
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
     return {
         type : actionTypes.SET_AUTH_REDIRECT_PATH,
         path : path
     }
}
 