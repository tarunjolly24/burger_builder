import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button';
const OrderSummary =props=>{
    
    
       let ingredientSummary = Object.keys(props.ingredients)
    .map(igkey=>{
        return <li key={igkey}>
            <span style={{textTransform:'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}
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
                Total Price:{props.price}
            </p>
            <p>Continue to CheckOut</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>

        </Aux>
    )
    
}

export default OrderSummary;