import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false,
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,


            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5

                },
                valid: false,
                touched: false,


            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest',
                        displayValue: 'Fastest'
                    }, {
                        value: 'cheapest',
                        displayValue: 'Cheapest'
                    },]
                },
                value: 'fastest',
                validation: {},
                valid: true

            }
        },
        formIsValid: false,
        loading: false,

    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid;
        }
        return isValid;
    }

    orderHandler = (e) => {
        e.preventDefault();
       
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

        }

        
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        this.props.onOrderBurger(order);
        
        
    }
    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log(updatedFormElement);
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });

    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formelement => {
                return <Input
                    changed={(event) => this.inputChangedHandler(event, formelement.id)}
                    key={formelement.id}
                    elementType={formelement.config.elementType}
                    elementConfig={formelement.config.elementConfig}
                    value={formelement.config.value}
                    invalid={!formelement.config.valid}
                    touched={formelement.config.touched}
                    shouldValidate={formelement.config.validation}
                />
            })}
            <Button disabled={!this.state.formIsValid} btnType="Success" >Order</Button>

        </form>);
        if (this.state.loading) {
            form = <Spinner></Spinner>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        )
    }


}


const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispathToProps =dispatch=>{
   return{ onOrderBurger:(orderData)=>dispatch(actions.purchaseBurgerStart(orderData)),
   }
};

export default connect(mapStateToProps,mapDispathToProps)( withErrorHandler(ContactData,axios));