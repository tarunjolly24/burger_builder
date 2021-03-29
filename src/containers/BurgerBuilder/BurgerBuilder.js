import React, { Component } from "react";
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={}
    // }
    state = {
       
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true });

        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;


    }
//removed code
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCounted = oldCount + 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type] = updatedCounted;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
    //     this.updatePurchaseState(updatedIngredient);

    // }


    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) return;
    //     const updatedCounted = oldCount - 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type] = updatedCounted;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
    //     this.updatePurchaseState(updatedIngredient);

    // }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        // this.setState({purchasing:false})
        // console.log("you continue");
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'max',
        //         address: {
        //             street: 'teststreet 1',
        //             zipCode: '41351',
        //             country: 'germany'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order).then((res) => {
        //     console.log(res);
        //     this.setState({ loading: false, purchasing: false });
        // })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing: false });

        //         console.log(error)
        //     });
        // const queryParams=[];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.props.Price);
        // const queryString=queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push({
           pathname: '/checkout',
        //    search:'?'+queryString
           
    });

    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>ingredients can't be loaded</p> : <Spinner></Spinner>
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>

            )
            orderSummary = <OrderSummary price={this.props.price} purchaseCanceled={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler} ingredients={this.props.ings}></OrderSummary>

        }

        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null,
    }
}

const mapDispathToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path)),
    }
};

export default connect(mapStateToProps,mapDispathToProps)( withErrorHandler(BurgerBuilder, axios));