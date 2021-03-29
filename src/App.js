import './App.css';
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux/Aux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch,Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { withRouter } from 'react-router-dom';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

// const asyncCheckout=asyncComponent(()=>{
//   return import('./containers/Checkout/Checkout');
// });
// const asyncOrders=asyncComponent(()=>{
//   return import('./containers/Orders/Orders');
// });
// const asyncAuth=asyncComponent(()=>{
//   return import('./containers/Auth/Auth');
// });

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/"></Redirect>
      </Switch>

    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/orders" component={Orders}></Route>
        <Route path="/logout" exact component={Logout}></Route>
        <Route path="/auth" exact component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/"></Redirect>


      </Switch>

      )
    }
    return (
      <Aux>
        <Layout>
        {routes}

        </Layout>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => {
      return dispatch(actions.authCheckState())
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
