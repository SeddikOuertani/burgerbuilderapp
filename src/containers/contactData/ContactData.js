import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name : '',
            email : '',
            address : {
                street :'',
                postalCode : 0,
            },
            
            loading : false,
         }
    }

    orderHandler = (event) =>{
        event.preventDefault()
        this.setState({loading : true})
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price, //WARNING
            /*the setting of price is unsafe and to make sure users aren't
            manipulating the pricing, there should be a second price calculation
            in the server side.*/
            customer : {
                Name : 'Seddik',
                address : {
                    street : 'Test Street',
                    zipCode : "1111",
                    country : "Tunisia"
                },
                email : 'myEmail@gmail.com'
            }, 
            deliveryMethod : 'fastest',
            thiccLevelOfurger : 'thiiccc'
        }
        
        //orders is being created when I make the post request
        axios.post('/orders.json', order)
            .then(response =>{
                console.log(response);
                this.setState({loading : false,});
                this.props.history.push('/')
            }).catch(error => {
                this.setState({loading : false,})
                console.log(error);
            })
    }

    render() { 

        let form = (
            <form>
                <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code"/>
                <input className={classes.Input} type="text" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
            </form> 
        );
        if(this.state.loading){
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
 
export default ContactData ;