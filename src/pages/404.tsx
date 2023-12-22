import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import Meta from "../seo/Meta";
import MainLayout from "../layouts/MainLayout";
import {api, get} from "../api/request";
import NotFountContent from "../features/404/NotFountContent";

const Home: FC<PropsWithChildren<any>> = ({
                                              categories,
                                              contacts,
                                          }) => {


    return (
        <Meta title={'404'}>
            <MainLayout
                categories={categories}
                contacts={contacts}
            >
                <NotFountContent/>
            </MainLayout>
        </Meta>
    )
}

export async function getStaticProps(context: any) {

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
    } catch (e: any) {
        console.log(e?.response?.data)
        return {
            props: {
                categories: [],
                contacts: {},
            },
            revalidate: 60,
        }
    }
}

export default Home;
