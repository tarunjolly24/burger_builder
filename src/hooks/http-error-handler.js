import {useState,useEffect} from 'react';

const Abc=httpClient =>{
    const [error,setError] =useState(null);
       
       
            const reqInterceptor = httpClient.interceptors.request.use(req => {
                setError(null);
                return req;
            })
            const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
                setError(err);
            });
        
            useEffect(()=>{
                return ()=>{
                    httpClient.interceptors.request.eject(reqInterceptor);
                    httpClient.interceptors.request.eject(resInterceptor);
        
                };
            },[resInterceptor, reqInterceptor, httpClient.interceptors.request])

    
       const errorConfirmedHandler = () => {
        setError(null);
    }
    return [error,errorConfirmedHandler];
}

export default Abc;