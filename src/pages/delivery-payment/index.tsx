import React, {FC, PropsWithChildren} from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import DeliveryPaymentContent from "../../features/delivery-payment/DeliveryPaymentContent";
import {api, get} from "../../api/request";

const DeliveryPayment: FC<PropsWithChildren<any>> = ({
                                                         categories,
                                                         contacts,
                                                         mainData
                                                     }) => {

    return (
        <Meta title={'Доставка и оплата'}>
            <MainLayout contacts={contacts} categories={categories}>
                <DeliveryPaymentContent mainData={mainData}/>
            </MainLayout>
        </Meta>
    );
};

export async function getStaticProps() {

    try {
        const wooCommerceCategories: any = await api.get("products/categories");
        const contacts: any = await get(`wp-json/wp/v3/options`);
        const mainData: any = await get(`wp-json/wp/v2/pages/183`);

        return {
            props: {
                categories: wooCommerceCategories?.data || [],
                contacts: contacts || {},
                mainData: mainData || {},
            },
            revalidate: 60,
        }
    } catch (e) {
        return {
            props: {
                categories: [],
                contacts: {},
                mainData: {}
            },
            revalidate: 60,
        }
    }
}

export default DeliveryPayment;
