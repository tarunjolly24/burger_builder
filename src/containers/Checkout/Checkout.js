import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
// import * as actions from '../../store/actions/index'
class Checkout extends Component{

    // state={
    //     ingredients:{
    //         salad:0,
    //         meat:0,
    //         cheese:0,
    //         bacon:0
    //     },
    //     price:0
    // }
    // componentWillMount(){
    //     console.log(this.props);
    //     const query=new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries() ){
    //         //['salad','1']
    //         if(param[0]==='price'){
    //             price=param[1];
    //         }else
    //         ingredients[param[0]]= +param[1];
    //     }
    //     this.setState({ingredients:ingredients,totaPrice:price});
    // }
    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    // componentWillMount(){
    //     this.props.onInitPurchase();
    // }
    
    render(){
        let summary=<Redirect to="/"/>
        if(this.props.ings){
            let purchasedRedirect= this.props.purchased?<Redirect to="/"/>:null;
            summary=(<div>
                {purchasedRedirect}
            <CheckoutSummary ingredients={this.props.ings}
             oncheckoutCancelled={this.checkoutCancelledHandler} 
             oncheckoutContinued={this.checkoutContinuedHandler}
            />
            <Route path={this.props.match.path+'/contact-data'}
             component={ContactData} />
            </div>);
        }
        return summary;
            
               
                // {/* render={(props)=>(<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)} */}
            
        
    }


}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

// const mapDispathToProps=(dispatch)=>{
//     return{
//         onInitPurchase:()=>dispatch(actions.purchaseInit())
//     }
// }


export default connect(mapStateToProps)(Checkout);