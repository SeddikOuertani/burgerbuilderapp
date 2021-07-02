import React from 'react';
import Logo from '../../../../assets/imgs/toggleMenu.png'
import classes from './ToggleMenuLogo.module.css';

const toggleMenuLogo = (props) => (

    <div onClick={props.clicked} className={classes.Logo}>
        <img src={Logo} alt="Menu button"></img>
    </div>
)
 
export default toggleMenuLogo;