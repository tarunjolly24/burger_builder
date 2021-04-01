import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-error-handler';
// import axios from '../../axios-orders';
const withErrorHandler = (WrappedComponent, axios) => {

    return props=> {
       const [error,clearError]= useHttpErrorHandler(axios);
         
            return (
                <Aux>
                    <Modal show={error} modalClosed={clearError}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props}></WrappedComponent>
                </Aux>
            )
        
    }
}
export default withErrorHandler;