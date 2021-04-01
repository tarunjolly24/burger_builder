import './App.css';
import React, {  useEffect } from 'react';
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

// const asyncCheckout=React.lazy(()=>{
//   return import('./containers/Checkout/Checkout');
// });
// const asyncOrders=React.lazy(()=>{
//   return import('./containers/Orders/Orders');
// });
// const asyncAuth=asyncComponent(()=>{
//   return import('./containers/Auth/Auth');
// });

const App =props=> {
  const {onTryAutoSignup}=props;
  useEffect(()=>{
    onTryAutoSignup();

  },[onTryAutoSignup])  
    let routes = (
      <Switch>
        <Route path="/auth" exact render={(props)=><Auth {...props}/>}></Route>
        <Route path="/" exact render={(props)=><BurgerBuilder {...props}/>}></Route>
        <Redirect to="/"></Redirect>
      </Switch>

    );
    if (props.isAuthenticated) {
      routes = (
        <Switch>
        <Route path="/checkout" render={(props)=><Checkout {...props}/>}></Route>
        <Route path="/orders" render={(props)=><Orders {...props}/>}></Route>
        <Route path="/logout" exact render={(props)=><Logout {...props}/>}></Route>
        <Route path="/auth" exact render={(props)=><Auth {...props}/>}></Route>
        <Route path="/" exact render={(props)=><BurgerBuilder {...props}/>}></Route>
        <Redirect to="/"></Redirect>


      </Switch>

      )
    }
    return (
      <Aux>
        <Layout>
          {/* <Suspense fallback={<p>...loading</p>}></Suspense> */}
        {routes}

        </Layout>
      </Aux>
    );
  
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
