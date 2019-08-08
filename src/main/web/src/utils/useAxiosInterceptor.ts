import {AxiosInterceptorManager} from "axios";
import {useEffect} from "react";

export const useAxiosInterceptor = <T>(interceptors: AxiosInterceptorManager<T>,
                                       onFulfilled: (value: T) => T | Promise<T>,
                                       onRejected?: (error: any) => any) => useEffect(() => {
    const interceptorId = interceptors.use(onFulfilled, onRejected);
    return () => interceptors.eject(interceptorId);
}, [interceptors, onFulfilled, onRejected]);