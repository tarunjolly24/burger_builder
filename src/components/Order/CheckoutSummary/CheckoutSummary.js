import React from 'react';
import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>we hop it tastes well</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.oncheckoutCancelled}>Cancel</Button>
            <Button btnType="Success"clicked={props.oncheckoutContinued}>Continue</Button>

        </div>

    );
}

export default checkoutSummary;