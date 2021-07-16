import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
// import {withRouter } from 'react-router-dom';
//can be used to pass closest routing props
//we need to wrap out export with it

const burger = (props) => {
    let ingrendientsArr = Object.keys(props.ingredients)
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )]
                .map( ( i, _ ) => {
                    return <BurgerIngredient key={igKey + Math.random()*90} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        } , [])

    if (ingrendientsArr.length === 0){
        ingrendientsArr = <p>please start adding ingredients !</p>
    }
    
    
    return ( 
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {ingrendientsArr}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}
 
export default burger;