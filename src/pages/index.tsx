import Head from 'next/head'
import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import Meta from "../seo/Meta";
import MainLayout from "../layouts/MainLayout";
import IntroSection from "../features/main/sections/IntroSection";
import Brands from "../features/main/sections/Brands";
import CategorySection from "../features/main/sections/CategorySection";
import StandSection from "../features/main/sections/StandSection";
import AboutSection from "../features/main/sections/AboutSection";
import ConsultationsFormSection from "../sections/ConsultationsFormSection";
import SeoSection from "../sections/SeoSection";
import {api, get} from "../api/request";

const Home: FC<PropsWithChildren<any>> = ({
                                              brands,
                                              categories,
                                              contacts,
                                              mainData,
                                              meta
                                          }) => {

    console.log(meta)
    console.log(mainData)

    return (
        <Meta title={'Главная'} metaData={meta}>
            <MainLayout
                categories={categories}
                contacts={contacts}
                meta={meta}
            >
                <IntroSection banner={mainData?.banner}/>
                <Brands brands={brands}/>
                <CategorySection categories={mainData?.categories}/>
                <StandSection about={mainData?.about}/>
                <AboutSection imagine={mainData?.imagine}/>
                <ConsultationsFormSection/>
                <SeoSection seo={mainData?.seo}/>
            </MainLayout>
        </Meta>
    )
}

export async function getStaticProps(context: any) {

    try {

        const wooCommerceCategories: any = await api.get("products/categories");

        const brands: any = await get(`wp-json/wp/v3/products/brands`);
        const contacts: any = await get(`wp-json/wp/v3/options`);
        const mainData: any = await get(`wp-json/wp/v3/main-page`);
        const meta: any = await get(`wp-json/wp/v2/pages/123`);

        return {
            props: {
                brands: brands || [],
                categories: wooCommerceCategories?.data || [],
                contacts: contacts || {},
                mainData: mainData || {},
                meta: meta || {},
            },
            revalidate: 60,
        }
    } catch (e: any) {
        console.log(e?.response?.data)
        return {
            props: {
                brands: [],
                categories: [],
                contacts: {},
                mainData: {},
                meta: {},
            },
            revalidate: 60,
        }
    }
}

export default Home;
