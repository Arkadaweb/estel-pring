import axios from 'axios';
import {apiUrl} from './environment'

let transport: any;


export const configureTransport = (token = null) => {

    const options: any =  token  ?
        {
            baseURL: 'https://arkadawebstudio.ru',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        : { baseURL: 'https://arkadawebstudio.ru' };
    transport = axios.create(options);

    return transport;
};

export const getTransport = () => transport || configureTransport();
