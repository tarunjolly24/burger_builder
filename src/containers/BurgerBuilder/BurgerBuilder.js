import React, { Component } from "react";

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable:false,
        purchasing:false,
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    updatePurchaseState(ingredients){

        const sum=Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);

        this.setState({purchaseable:sum>0});


    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredient);
        
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0)return;
        const updatedCounted = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredient);

    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
        // this.setState({purchasing:false})
        console.log("you continue");
    }

    render() {
        const disabledInfo={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary price={this.state.totalPrice} purchaseCanceled={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler}  ingredients={this.state.ingredients}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }

}

export default BurgerBuilder;