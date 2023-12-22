import React, {FC, PropsWithChildren} from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import CatalogContent from "../../features/catalog/CatalogContent";
import {api, get} from "../../api/request";

const Catalog: FC<PropsWithChildren<any>> = ({
                                                 products,
                                                 totalCount,
                                                 sort,
                                                 brands,
                                                 categories,
                                                 contacts,
                                                 mainData
                                             }) => {


    return (
        <Meta title={'Каталог'} metaData={mainData}>
            <MainLayout contacts={contacts} categories={categories}>
            <CatalogContent
                    products={products}
                    totalCount={totalCount}
                    sort={sort}
                    path={'/catalog'}
                    brands={brands}
                    categories={categories}
                    mainData={mainData}
                />
            </MainLayout>
        </Meta>
    );
};

export async function getServerSideProps(context: any) {

    const sort: any = {
        per_page: 10,
        page: context?.query?.page || 1,
        orderby: context?.query?.orderby || 'price',
        order: context?.query?.order || 'asc',
        search: context?.query?.search || '',
    }

    if (context?.query?.search) {
        sort.search = context?.query?.search
    }

    if (context?.query?.attribute && context?.query?.attribute_term) {
        sort.attribute = context?.query?.attribute
        sort.attribute_term = context?.query?.attribute_term
    }

    if (context?.query?.min_price || context?.query?.max_price) {
        sort.min_price = context?.query?.min_price
        sort.max_price = context?.query?.max_price
    }

    try {
        const wooCommerceProducts: any = await api.get("products", {
            ...sort
        });
        const mainData: any = await get(`wp-json/wp/v2/pages/7`);

        const wooCommerceCategories: any = await api.get("products/categories");

        const brands = await api.get(`products/attributes/3/terms`)
        const contacts: any = await get(`wp-json/wp/v3/options`);

        const filterBrands = context?.query?.attribute_term
            ? brands?.data?.filter((item: any) => item?.count > 0)
            ?.map((item: any) => context?.query?.attribute_term?.includes(String(item?.id)) ? ({
                ...item,
                isCheck: true
            }) : ({...item, isCheck: false})) || []
            : brands?.data

        return {
            props: {
                products: wooCommerceProducts?.data || [],
                totalCount: wooCommerceProducts?.headers['x-wp-total'] || 0,
                sort: sort,
                brands: filterBrands || [],
                categories: wooCommerceCategories?.data || [],
                contacts: contacts || {},
                mainData: mainData || {},
            },
        }
    } catch (e: any) {
        // console.log(e?.response)
        return {
            props: {
                products: [],
                totalCount: 0,
                sort: sort,
                brands: [],
                categories: [],
                contacts: {},
                mainData: {},
            },
        }
    }
}

export default Catalog;
