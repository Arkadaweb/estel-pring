import '../styles/main.scss'

import React, {useEffect} from 'react';
import {AppProps} from "next/app";
import {NextFonts} from "../components/common/NextFonts";
import Head from "next/head";
import {Provider} from "react-redux";
import {persistor, store} from "../store/store";
import {ConfigProvider} from "antd";
import {PersistGate} from 'redux-persist/integration/react';
import NProgress from 'nprogress';
import Router from 'next/router';
import {ConsultationFormProvider} from "../components/common/ConsultationFormProvider";
import {ConfirmController} from "../components/common/ConfirmController";



export default function App({Component, pageProps}: AppProps) {

    console.log('process.env.HOST_SERVER')
    console.log(process.env.HOST_SERVER)

    NProgress.configure({
        minimum: 0.3,
        easing: 'ease',
        speed: 800,
        showSpinner: true,
    });

    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());

    const antdTheme: any = {
        token: {
            colorPrimary: 'rgba(75, 103, 233, 1)',
            controlInteractiveSize: 16,
            fontSize: 16,
            borderRadius: 13,
        },
        Pagination: {
            itemActiveBg: '#4B67E9',
            itemActiveBgDisabled: '#4B67E9',
            itemActiveColorDisabled: '#4B67E9',
            itemBg: '#4B67E9',
            itemInputBg: '#4B67E9',
            itemLinkBg: '#4B67E9',
        },
        Select: {
            optionFontSize: 200,
        },
    };

    return (
        <div>
            <NextFonts/>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no"
                />
            </Head>
            <ConfigProvider theme={antdTheme}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ConsultationFormProvider>
                            <ConfirmController>
                                <Component {...pageProps} />
                            </ConfirmController>
                        </ConsultationFormProvider>
                    </PersistGate>
                </Provider>
            </ConfigProvider>
        </div>
    )

}
