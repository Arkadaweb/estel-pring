import React, {FC, PropsWithChildren} from 'react';
import Meta from "../../../../seo/Meta";
import MainLayout from "../../../../layouts/MainLayout";
import ProductContent from "../../../../features/product/ProductContent";
import {api} from "../../../../api/request";

const Product: FC<PropsWithChildren<any>> = ({
                                                 product
                                             }) => {

    return (
        <Meta title={'Продукт'}>
            <MainLayout>
                <ProductContent
                    product={product}
                />
            </MainLayout>
        </Meta>
    );
};

export async function getServerSideProps(context: any) {

    try {
        const wooCommerceProduct: any = await api.get(`products/${context.query.id}`);

        return {
            props: {
                product: wooCommerceProduct.data,
            },
        }
    } catch (e: any) {
        console.log(e?.response?.data)
        return {
            props: {
                product: [],
            },
        }
    }
}

export default Product;