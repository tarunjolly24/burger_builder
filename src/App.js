import './App.css';
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux/Aux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
class App extends Component {
  render() {

    return (
      <Aux>
        <Layout>
          <BurgerBuilder></BurgerBuilder>
        </Layout>
      </Aux>
    );
  }
}

export default App;
