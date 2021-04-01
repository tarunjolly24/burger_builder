// import React, { useState, useEffect } from "react";
// import { connect } from 'react-redux';
// import Aux from '../../hoc/Aux/Aux'
// import Burger from '../../components/Burger/Burger';
// import BuildControls from '../../components/Burger/BuildControls/BuildControls';
// import Modal from '../../components/UI/Modal/Modal';
// import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import axios from '../../axios-orders';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actions from '../../store/actions/index';


// const BurgerBuilder = props => {
 
//     const [purchasing, setPurchasing] = useState(false);
//     const {onInitIngredients}=props;
//     useEffect(() => {
//         onInitIngredients();

//     }, [onInitIngredients])


//     const purchaseHandler = () => {
//         if (props.isAuthenticated) {
//             setPurchasing(true);

//         } else {
//             props.onSetAuthRedirectPath('/checkout');
//             props.history.push('/auth');
//         }
//     }

//     const updatePurchaseState = (ingredients) => {

//         const sum = Object.keys(ingredients)
//             .map(igkey => {
//                 return ingredients[igkey];
//             })
//             .reduce((sum, el) => {
//                 return sum + el;
//             }, 0);

//         return sum > 0;


//     }


//     const purchaseCancelHandler = () => {
//         setPurchasing(false);
//     }
//     const purchaseContinueHandler = () => {
        
//         props.onInitPurchase();
//         props.history.push({
//             pathname: '/checkout',
            

//         });

//     }


//     const disabledInfo = {
//         ...props.ings
//     }
//     let orderSummary = null;

//     let burger = props.error ? <p>ingredients can't be loaded</p> : <Spinner></Spinner>
//     if (props.ings) {
//         burger = (
//             <Aux>
//                 <Burger ingredients={props.ings}></Burger>
//                 <BuildControls
//                     ingredientAdded={props.onIngredientAdded}
//                     ingredientRemoved={props.onIngredientRemoved}
//                     disabled={disabledInfo}
//                     price={props.price}
//                     isAuth={props.isAuthenticated}
//                     purchaseable={updatePurchaseState(props.ings)}
//                     ordered={purchaseHandler}
//                 />
//             </Aux>

//         )
//         orderSummary = <OrderSummary price={props.price} purchaseCanceled={purchaseCancelHandler} purchaseContinue={purchaseContinueHandler} ingredients={props.ings}></OrderSummary>

//     }

//     // if (this.state.loading) {
//     //     orderSummary = <Spinner></Spinner>
//     // }

//     for (let key in disabledInfo) {
//         disabledInfo[key] = disabledInfo[key] <= 0;
//     }
//     return (
//         <Aux>
//             <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
//                 {orderSummary}
//             </Modal>
//             {burger}
//         </Aux>
//     );


// }

// const mapStateToProps = state => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null,
//     }
// }

// const mapDispathToProps = dispatch => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
//     }
// };

// export default connect(mapStateToProps, mapDispathToProps)(withErrorHandler(BurgerBuilder, axios));
import React, { useState, useEffect, useCallback } from 'react';
import {  useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const BurgerBuilder = props => {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = ingName =>
    dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = path =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

//   const updatePurchaseState = ingredients => {
//     const sum = Object.keys(ingredients)
//       .map(igKey => {
//         return ingredients[igKey];
//       })
//       .reduce((sum, el) => {
//         return sum + el;
//       }, 0);
//     return sum > 0;
//   };
const updatePurchaseState = (ingredients) => {

            const sum = Object.keys(ingredients)
                .map(igkey => {
                    return ingredients[igkey];
                })
                .reduce((sum, el) => {
                    return sum + el;
                }, 0);
    
            return sum > 0;
    
    
        }
    

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };
  console.log(ings);
  const disabledInfo = {
    ...ings
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchaseable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }
  // {salad: true, meat: false, ...}
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);