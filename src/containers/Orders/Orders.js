// import classes from '*.module.css';
import React, { useEffect } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
// import order from '../../components/Order/Order';
const Orders=props=>{
    const {onFetchedOrders,token,userId}=props;
    useEffect(()=>{
        onFetchedOrders(token,userId);

    },[onFetchedOrders,token,userId])
    //if i add props here [] then infinite loop why 

    
        let orders=<Spinner/>
        if(!props.loading){
           orders=( props.orders.map(order=>{
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