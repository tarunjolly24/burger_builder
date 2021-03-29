import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button';
class OrderSummary extends Component{
    componentDidUpdate(){
        // console.log('order willsummar will update')
    }
    render(){
       let ingredientSummary = Object.keys(this.props.ingredients)
    .map(igkey=>{
        return <li key={igkey}>
            <span style={{textTransform:'capitalize'}}>{igkey}</span>: {this.props.ingredients[igkey]}
        </li>
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>
                Total Price:{this.props.price}
            </p>
            <p>Continue to CheckOut</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>

        </Aux>
    )
    }
}

export default OrderSummary;