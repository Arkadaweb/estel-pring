import React, {FC, PropsWithChildren} from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import BucketContent from "../../features/bucket/BucketContent";
import {api, get} from "../../api/request";

const Bucket: FC<PropsWithChildren<any>> = ({
                                                categories,
                                                contacts
                                            }) => {

    return (
        <Meta title={'Корзина'}>
            <MainLayout contacts={contacts} categories={categories}>
                <BucketContent/>
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

export default Bucket;
