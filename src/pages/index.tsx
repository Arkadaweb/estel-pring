import Head from 'next/head'
import React from "react";
import Meta from "../seo/Meta";
import MainLayout from "../layouts/MainLayout";
import IntroSection from "../features/main/sections/IntroSection";
import PopularComplex from "../features/main/sections/PopularComplex";

export default function Home() {

    return (
        <Meta title={'Главная'}>
            <MainLayout>
                {/*Популярные комплексы*/}
                <IntroSection/>
                <PopularComplex/>
            </MainLayout>
        </Meta>
    )
}
