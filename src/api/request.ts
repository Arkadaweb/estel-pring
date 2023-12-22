import {getTransport, configureTransport} from './transport';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// initialise the WooCommerceRestApi //
export const api = new WooCommerceRestApi({
    url: "https://testcosm.arkada-web-studio.ru",
    consumerKey: "ck_4a3460f395645984c0e6ca0724906c80d5be99cc",
    consumerSecret: "cs_fe0db15aa7056756e351f1091feac7e05a1b3294",
    version: "wc/v3",
});
// initialise the WooCommerceRestApi //

export const get = (path: any,config?: any) => getTransport()
    .get(`/${path}`, config).then((response: any) => response.data);

export const post = async (path: any, payload: any, config: any) => getTransport()
    .post(`/${path}`, payload, config)
    .then((response: any) => response.data);

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
