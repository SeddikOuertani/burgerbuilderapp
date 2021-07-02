import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label : 'Salad', type : 'salad'},
    {label : 'Meat', type : 'meat'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Cheese', type : 'cheese'},
]

const buildControls = (props) => {

    return ( 
        <div className={classes.BuildControls}>
            <p>Current price : <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                    purchaceDisabled={props.purchaseDisabled}
                    ingredientRemoved={() => props.ingredientRemoved(ctrl.type)}
                    ingredientAdded={() => props.ingredientAdded(ctrl.type) } 
                    key={ctrl.label} 
                    label={ctrl.label}
                    disabled={props.disabled[ctrl.type]}/>
            ))}
            <button
                disabled={props.purchaseDisabled}
                className={classes.OrderButton}
                onClick={props.ordered}>
                    Order Now
            </button>
        </div> 
    );
}
 
export default buildControls;