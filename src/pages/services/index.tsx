import React, {FC, PropsWithChildren} from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import ServicesContent from "../../features/services/ServicesContent";
import {api, get} from "../../api/request";

const Services: FC<PropsWithChildren<any>> = ({
                                                  categories,
                                                  contacts,
                                                  mainData
                                              }) => {

    return (
        <Meta title={'Услуги'} metaData={mainData}>
            <MainLayout categories={categories} contacts={contacts}>
                <ServicesContent table={mainData?.acf?.services?.table}/>
            </MainLayout>
        </Meta>
    );
};

export async function getStaticProps() {

    try {
        const wooCommerceCategories: any = await api.get("products/categories");
        const contacts: any = await get(`wp-json/wp/v3/options`);
        const mainData: any = await get(`wp-json/wp/v2/pages/171`);

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

export default Services;
