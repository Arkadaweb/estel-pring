import React, {FC, PropsWithChildren} from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import FinishBucket from "../../features/bucket/FinishBucket";
import {api, get} from "../../api/request";

const Finish: FC<PropsWithChildren<any>> = ({
                                                categories,
                                                contacts
                                            }) => {

    return (
        <Meta title={'Спасибо за заказ!'}>
            <MainLayout contacts={contacts} categories={categories}>
                <FinishBucket/>
            </MainLayout>
        </Meta>
    );
};

export async function getStaticProps() {

    try {
        const wooCommerceCategories: any = await api.get("products/categories");
        const contacts: any = await get(`wp-json/wp/v3/options`);

        return {
            props: {
                categories: wooCommerceCategories?.data || [],
                contacts: contacts || {},
            },
            revalidate: 60,
        }
    } catch (e) {
        return {
            props: {
                categories: [],
                contacts: {}
            },
            revalidate: 60,
        }
    }
}

export default Finish;
