import React, {FC, PropsWithChildren} from 'react';
import Meta from "../../../../seo/Meta";
import MainLayout from "../../../../layouts/MainLayout";
import ProductContent from "../../../../features/product/ProductContent";
import {api, get} from "../../../../api/request";

const Product: FC<PropsWithChildren<any>> = ({
                                                 product,
                                                 variations,
                                                 commonProducts,
                                                 media,
                                                 categories,
                                                 contacts
                                             }) => {

    return (
        <Meta title={'Продукт'} metaData={product}>
            <MainLayout contacts={contacts} categories={categories}>
            <ProductContent
                    product={product}
                    variations={variations}
                    commonProducts={commonProducts}
                    media={media}
                />
            </MainLayout>
        </Meta>
    );
};

export async function getServerSideProps(context: any) {

    try {
        const contacts: any = await get(`wp-json/wp/v3/options`);

        const wooCommerceProduct: any = await api.get(`products?slug=${context?.params?.product}`);

        const wooCommerceProductsCommon: any = await api.get(`products?include=${wooCommerceProduct?.data?.[0]?.related_ids}`);
        // const productsMedia: any = await get(`wp-json/wp/v3/products/media/${wooCommerceProduct?.data?.[0]?.id}`);

        const wooCommerceCategories: any = await api.get("products/categories");

        const wooCommerceVariations: any = await api.get(`products/${wooCommerceProduct?.data[0]?.id}/variations`,{
            per_page: 100
        });

        return {
            props: {
                product: wooCommerceProduct?.data[0] ? wooCommerceProduct?.data[0] : [],
                variations: wooCommerceVariations?.data || [],
                commonProducts: wooCommerceProductsCommon?.data || [],
                categories: wooCommerceCategories?.data || [],
                media: [],
                contacts: contacts || {},
                // media: productsMedia || []
            },
        }
    } catch (e: any) {
        console.log(e?.response?.data)
        return {
            props: {
                product: {},
                variations: [],
                commonProducts: [],
                media: [],
                categories: [],
                contacts: {}
            },
        }
    }
}

export default Product;
