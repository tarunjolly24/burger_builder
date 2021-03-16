import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevstate) => {
            return { showSideDrawer: !prevstate.showSideDrawer }
        })
    }


    render() {
        return (
            <Aux>
                <Toolbar  drawerToggleHandler={this.sideDrawerToggleHandler} />
                <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />
                <div>toolar,sidedrawer,backdrop</div>
                <main className={classes.Content}>

                    {this.props.children}
                </main>
            </Aux>)
    }
}


export default Layout;
