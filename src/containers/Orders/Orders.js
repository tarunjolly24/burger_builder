// import classes from '*.module.css';
import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
// import order from '../../components/Order/Order';
class Orders extends Component{
    
    componentDidMount(){
        this.props.onFetchedOrders(this.props.token,this.props.userId);
    }
    render(){
        let orders=<Spinner/>
        if(!this.props.loading){
           orders=( this.props.orders.map(order=>{
                return  <Order key={order.id} ingredients={order.ingredients} price={order.price}></Order>
              })
           );
        }
        return(
         <div>
             {orders}

         </div>   
        );
    }
}

const mapStateToProps=state=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId,
    }
}

const matchDispatchToProps=dispatch=>{
    return{
        onFetchedOrders:(token,userId)=>dispatch(actions.fetchOrders(token,userId)),
    }
}

export default connect(mapStateToProps,matchDispatchToProps)(withErrorHandler(Orders,axios)) ;