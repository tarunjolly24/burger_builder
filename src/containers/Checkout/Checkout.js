import React  from 'react';
import {Route,Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
// import * as actions from '../../store/actions/index'
const Checkout=props=>{

   
  const checkoutCancelledHandler=()=>{
        props.history.goBack();
    }
  const  checkoutContinuedHandler=()=>{
        props.history.replace('/checkout/contact-data')
    }

    
    
        let summary=<Redirect to="/"/>
        if(props.ings){
            let purchasedRedirect= props.purchased?<Redirect to="/"/>:null;
            summary=(<div>
                {purchasedRedirect}
            <CheckoutSummary ingredients={props.ings}
             oncheckoutCancelled={checkoutCancelledHandler} 
             oncheckoutContinued={checkoutContinuedHandler}
            />
            <Route path={props.match.path+'/contact-data'}
             render={()=><ContactData/>} />
            </div>);
        }
        return summary;
            
               
                // {/* render={(props)=>(<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)} */}
            
        
    


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