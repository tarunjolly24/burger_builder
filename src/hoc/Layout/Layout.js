import React, { useState } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux'
const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }
    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }



    return (
        <Aux>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleHandler={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.isAuthenticated}

                closed={sideDrawerClosedHandler} open={sideDrawerIsVisible} />
            <div>toolar,sidedrawer,backdrop</div>
            <main className={classes.Content}>

                {props.children}
            </main>
        </Aux>)

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}
export default connect(mapStateToProps)(Layout);
