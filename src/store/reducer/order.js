import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading:false,
                orders:state.orders.concat()
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{

            };
        default:
            return state;

    }
}

export default reducer;