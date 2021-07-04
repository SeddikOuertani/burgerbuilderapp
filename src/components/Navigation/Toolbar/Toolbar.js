import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleMenuLogo from '../SideDrawer/ToggleMenuLogo/ToggleMenuLogo';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const toolbar = (props) => (
    <Aux>    
        <header className={classes.Toolbar}>

            <div className={classes.ToggleMenuButton}>
                <ToggleMenuLogo clicked={props.drawerToggleClicked}/>
            </div>

            <div className={classes.Logo}>
                <Logo/>
            </div>

            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>

        </header>
    </Aux>
);

export default toolbar;