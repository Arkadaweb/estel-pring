import React, {FC, PropsWithChildren} from 'react';
import Meta from "../../../seo/Meta";
import MainLayout from "../../../layouts/MainLayout";
import CatalogContent from "../../../features/catalog/CatalogContent";
import {api, get} from "../../../api/request";
import {useRouter} from "next/router";

const CatalogCategory: FC<PropsWithChildren<any>> = ({
                                                         products,
                                                         totalCount,
                                                         sort,
                                                         brands,
                                                         currentCategory,
                                                         categories,
                                                         contacts
                                                     }) => {


    const routerNav = useRouter()
    let pathToGo = routerNav.pathname.replace('[category]', String(routerNav.query.category));

    return (
        <Meta title={'Каталог'} metaData={currentCategory}>
            <MainLayout contacts={contacts} categories={categories}>
            <CatalogContent
                    currentCategory={currentCategory}
                    products={products}
                    totalCount={totalCount}
                    sort={sort}
                    path={pathToGo}
                    brands={brands}
                    categories={categories}
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
        const contacts: any = await get(`wp-json/wp/v3/options`);
        const wooCommerceCategoryBySlug: any = await get(`wp-json/wp/v2/product_cat?slug=${context?.query?.category}`);

        console.log(wooCommerceCategoryBySlug[0]?.id)
        console.log(`wp-json/wp/v2/product_cat?slug${context?.query?.category}`)
        // const wooCommerceCategoryBySlug: any = await api.get(`products/categories`, {
        //     slug: context?.query?.category,
        // });

        // console.log(wooCommerceCategoryBySlug?.data[0]?.id)

        const wooCommerceCategories: any = await api.get("products/categories");


        const wooCommerceProducts: any = await api.get("products", {
            ...sort,
            category: wooCommerceCategoryBySlug?.length !== 0 ? wooCommerceCategoryBySlug[0]?.id : ''
            // category: wooCommerceCategoryBySlug?.data?.length !== 0 ? wooCommerceCategoryBySlug?.data[0]?.id : ''
        });

        const brands = await api.get(`products/attributes/3/terms`)

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
                // currentCategory: wooCommerceCategoryBySlug?.data?.length !== 0 ? wooCommerceCategoryBySlug?.data[0] : {},
                currentCategory: wooCommerceCategoryBySlug?.length !== 0 ? wooCommerceCategoryBySlug[0] : {},
                brands: filterBrands || [],
                categories: wooCommerceCategories?.data || [],
                contacts: contacts || {},
            },
        }
    } catch (e: any) {
        console.log(e?.response)
        return {
            props: {
                products: [],
                totalCount: 0,
                sort: sort,
                currentCategory: null,
                brands: [],
                categories: [],
                contacts: {}
            },
        }
    }
}

export default CatalogCategory;
