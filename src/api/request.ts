import {getTransport, configureTransport} from './transport';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import {apiUrl} from "./environment";

// initialise the WooCommerceRestApi //
export const api = new WooCommerceRestApi({
    url: apiUrl,
    consumerKey: "ck_598d1a05d5c512d824f0d17881360b6d0501c3e0",
    consumerSecret: "cs_e8338b1441a070a957674fae90452f9fa988bd87",
    version: "wc/v3",
});
// initialise the WooCommerceRestApi //

export const get = (path: any,config?: any) => getTransport()
    .get(`/${path}`, config).then((response: any) => response.data);

export const post = async (path?: any, payload?: any, config?: any) => getTransport()
    .post(`/${path}`, payload, config)
    .then((response: any) => response?.data);

export const put = (path: any, payload: any = {}) => getTransport()
    .put(`/${path}`, payload)
    .then((response: any) => response.data);

export const deleteRequest = (path: any, payload: any = {}) => getTransport()
    .delete(`/${path}`, payload)
    .then((response: any) => response.data);

export const patch = (path: any, payload: any = {}) => getTransport()
    .patch(`/${path}`, payload)
    .then((response: any) => response.data);

export const httpDelete = (path: any, config: any) => getTransport()
    .delete(`/${path}`, config)
    .then((response: any) => response.data);
