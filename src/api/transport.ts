import axios from 'axios';
import {apiUrl} from './environment'

let transport: any;


export const configureTransport = (token = null) => {

    const options: any =  token  ?
        {
            baseURL: process.env.HOST_SERVER,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        : { baseURL: process.env.HOST_SERVER };
    transport = axios.create(options);

    return transport;
};

export const getTransport = () => transport || configureTransport();
