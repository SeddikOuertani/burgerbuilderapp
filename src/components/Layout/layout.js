import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer : false

    }

    sideDrawerClosedHnadler = () =>{
        this.setState({showSideDrawer : false})
    }

    sideDrawerToggleHnadler = () =>{
        this.setState((prevState)=>{
                return{ showSideDrawer : !prevState.showSideDrawer}
        })
    }

    render(){
        return(

            <Aux>
                
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHnadler}/>

                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHnadler}
                />

                <main className={classes.Content}> 
                    {this.props.children} 
                </main>
            </Aux>
        )
    }
}
 
export default Layout;