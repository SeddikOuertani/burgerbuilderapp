import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input'
import { connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
class ContactData extends Component {
    state = { 
        orderForm : {
            
            name : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your name'
                },
                value : '',
                validation : {
                    required : true ,
                },
                valid : false,
                touched : false,
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Street'
                },
                value : '',
                validation : {
                    required : true ,
                },
                valid : false,
                touched : false,
            },
            zipCode : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'ZIP CODE'
                },
                value : '',
                validation : {
                    minLength : 5,
                    maxLength : 5,
                    required : true ,
                    isNumeric: true
                },
                valid : false,
                touched : false,
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Country'
                },
                value : '',
                validation : {
                    required : true ,
                },
                valid : false,
                touched : false,
            },
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Your E-mail'
                },
                value : '',
                validation : {
                    required : true ,
                    isEmail: true
                },
                valid : false,
                touched : false,
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                    options : [
                        {value : 'fastest', displayValue : 'Fastest'},
                        {value : 'cheapest', displayValue : 'Cheapest'}
                    ]
                },
                value : 'fastest',
                validation : {},
                valid : true,
            },
        },
    
        loading : false,
        formValid : false,
     }

    orderHandler = (event) =>{
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            orderData : formData,
        }

        //order is being created here
        this.props.onOrderBurger(order, this.props.token)
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElment = {...updatedOrderForm[inputIdentifier]};
        updatedFormElment.value = event.target.value;
        updatedFormElment.touched = true;
        updatedFormElment.valid = this.checkValidity(updatedFormElment.value, updatedFormElment.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElment;
        
        let formValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formValid = updatedOrderForm[inputIdentifier].valid && formValid;
        }
        this.setState({
            orderForm : updatedOrderForm,
            formValid : formValid
        })
    }

    

    render() { 

        let formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id : key,
                config : this.state.orderForm[key],
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement=>(
                    <Input
                        key = {formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button disabled={!this.state.formValid} clicked={this.orderHandler} btnType="Success">ORDER</Button>
            </form> 
        );
        if(this.props.loading){
            form = <Spinner/>
        }

        return ( 
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div> 
        );
    }
}
 
const mapStateToProps = (state) =>{
    return {
        ingredients : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token
    }
}

const mapDispatchToProps  = dispatch => {
    return {
        onOrderBurger : (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)) ;