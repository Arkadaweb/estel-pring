import React, {FC, PropsWithChildren, useState} from 'react';
import Head from "next/head";

const Meta: FC<PropsWithChildren<IMeta>> = ({
                                                title,
                                                pageTitle,
                                                children,
                                                metaData
                                            }) => {
    function addProductJsonLd() {
        return {
            __html: metaData?.yoast_head
        };
    }

    return (
        <>
            <Head>
                {
                    metaData?.yoast_head_json?.title
                        ?
                        <>
                            <title>{metaData?.yoast_head_json?.title}</title>
                            <meta name="description" content={metaData?.yoast_head_json?.description}/>
                            <meta name="keywords" content={metaData?.gmk}/>

                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={addProductJsonLd()}
                                key="product-jsonld"
                            />
                        </>
                        : <title>{title}</title>
                }
            </Head>
            <main>
                {children}
            </main>
        </>
    );
};

export default Meta;
