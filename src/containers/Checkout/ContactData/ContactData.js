import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',

        },
        loading: false,

    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        console.log("you continue");
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'max',
                address: {
                    street: 'teststreet 1',
                    zipCode: '41351',
                    country: 'germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then((res) => {
            console.log(res);
            this.setState({ loading: false });
            this.props.history.push('/');
        })
            .catch(error => {
                this.setState({ loading: false });

                console.log(error)
            });
        console.log(this.props)
    }

    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="your name"></input>
            <input className={classes.Input} type="email" name="email" placeholder="your email"></input>
            <input className={classes.Input} type="text" name="street" placeholder="street"></input>
            <input className={classes.Input} type="text" name="postal" placeholder="PostalCode"></input>
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>

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
export default ContactData;