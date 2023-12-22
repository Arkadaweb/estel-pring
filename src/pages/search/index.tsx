import React, {FC, PropsWithChildren} from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import SearchContent from "../../features/search/SearchContent";
import {api, get} from "../../api/request";

const Search: FC<PropsWithChildren<any>> = ({
                                                products,
                                                totalCount,
                                                sort,
                                                brands,
                                                categories,
                                                search,
                                                contacts
                                            }) => {

    return (
        <Meta title={'Результат поиска'}>
            <MainLayout contacts={contacts} categories={categories}>
                <SearchContent
                    products={products}
                    totalCount={totalCount}
                    sort={sort}
                    path={'/search'}
                    brands={brands}
                    categories={categories}
                    search={search}
                />
            </MainLayout>
        </Meta>
    );
};

export async function getServerSideProps(context: any) {

    const sort: any = {
        per_page: 100,
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
        const contacts: any = await get(`wp-json/wp/v3/options`);

        const wooCommerceCategories: any = await api.get("products/categories");

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
                brands: filterBrands || [],
                categories: wooCommerceCategories?.data || [],
                search: context?.query?.search,
                contacts: contacts || {},
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
            },
        }
    }
}

export default Search;
