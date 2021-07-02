import React from 'react';
import logoBurger from '../../assets/imgs/logoBurger.png';
import classes from './Logo.module.css'

const logo = (props) => (
        
        <div className={classes.Logo} style={{height : props.height}}>
            <img src={logoBurger} alt='My burger Logo'/>
        </div> 
);

 
export default logo;