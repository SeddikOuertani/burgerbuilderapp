import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    let ingrendientsArr = Object.keys(props.ingredients)
        .map(igKey=> {
            return [...Array(props.ingredients[igKey])].map((_,i)=> {
                return <BurgerIngredient key={igKey + i} type={igKey}/> 
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        } , [])
    console.log(ingrendientsArr)

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