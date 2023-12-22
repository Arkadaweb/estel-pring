import React from 'react';
import Meta from "../../../seo/Meta";
import MainLayout from "../../../layouts/MainLayout";
import OrderContent from "../../../features/bucket/OrderContent";

const Order = () => {

    return (
        <Meta title={'Оформление заказа'}>
            <MainLayout>
                <OrderContent/>
            </MainLayout>
        </Meta>
    );

};

export default Order;