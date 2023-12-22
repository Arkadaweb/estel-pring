import axios from 'axios';
import {apiUrl} from './environment'

let transport: any;


export const configureTransport = (token = null) => {

    const options: any =  token  ?
        {
            baseURL: apiUrl,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        : { baseURL: apiUrl };
    transport = axios.create(options);

    return transport;
};

export const getTransport = () => transport || configureTransport();
