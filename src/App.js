import './App.css';
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux/Aux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import {Route,Link,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders'
class App extends Component {
  render() {

    return (
      <Aux>
        <Layout>

          <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          </Switch>

        </Layout>
      </Aux>
    );
  }
}

export default App;
