import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import FilterDropDown from "../../components/common/FilterDropDown";
import SortDropDown from "../../components/common/SortDropDown";
import ProductItem from "../../components/common/ProductItem";
import CustomPagination from "../../components/common/CustomPagination";
import SeoSection from "../../sections/SeoSection";
import {useRouter} from "next/router";
import queryString from 'query-string';
import NotFound from "../../components/common/NotFound";

const CatalogContent: FC<PropsWithChildren<any>> = ({
                                                        products = [],
                                                        totalCount,
                                                        sort,
                                                        path,
                                                        brands = [],
                                                        currentCategory = null,
                                                        categories = [],
                                                        mainData
                                                    }) => {

    const orderBy = sort?.orderby
    const order = sort?.order

    const router = useRouter()

    const [selectedCategory, setSelectedCategory] = useState<any>(currentCategory);

    const [breadCrumbs, setBreadCrumbs] = useState<any>([])

    const initBreadCrumbs = [
        {
            id: 1,
            path: '/',
            title: 'Главная'
        },
        {
            id: 2,
            path: '/catalog',
            title: 'Каталог'
        },
    ]

    const onChangePage = async (page: any) => {
        changeSort('page', page)
    }

    const changeSort = (type: any, param: any) => {

        const currentQuery = router.query;

        if (currentQuery?.category) {
            delete currentQuery.category
        }

        if (type === 'page') {
            const newQuery = {...currentQuery, page: param};
            const queryStringified = queryString.stringify(newQuery);
            router.push(`${path}?${queryStringified}`);
        }

        if (type === 'sort') {
            let strings = param?.split(':');
            if (strings) {

                const newQuery = {...currentQuery, page: '1', orderby: strings[0], order: strings[1]};
                const queryStringified = queryString.stringify(newQuery);

                router.push(`${path}?${queryStringified}`);
            }
        }
    }

    const onChangeCategory = (item: any) => {
        const currentQuery = router.query;
        if (currentQuery?.category) {
            delete currentQuery.category
        }
        const queryStringified = queryString.stringify({...currentQuery, page: 1});
        router.push(`${'/catalog/' + item?.slug}?${queryStringified}`);
        setSelectedCategory(item)
    }

    useEffect(() => {
        if (currentCategory?.name) {
            setBreadCrumbs([
                ...initBreadCrumbs,
                {
                    id: 3,
                    path: '',
                    title: currentCategory?.name
                }
            ])
        } else {
            setBreadCrumbs([...initBreadCrumbs])
        }
    }, [currentCategory?.name])

    useEffect(() =>{
        setSelectedCategory(currentCategory)
    },[currentCategory])

    return (
        <div className="catalog-content">
            <div className="catalog-content-img">
                <MaxWithLayout>
                    <div className="catalog-content-crubs">
                        <BreadCrumbs
                            elements={breadCrumbs || initBreadCrumbs}
                            isWhite={true}
                        />
                    </div>
                    <div className="catalog-content-title">
                        {selectedCategory?.name || 'Каталог продукции'}
                    </div>
                </MaxWithLayout>
            </div>
            <MaxWithLayout>
                <div className="catalog-main">
                    <div className="catalog-main-categories">
                        {
                            categories?.map((item: any) =>
                                <div
                                    className="catalog-main-categories-item"
                                    onClick={() => onChangeCategory(item)}
                                    style={{
                                        color: item?.id === selectedCategory?.id ? 'rgba(255, 255, 255, 1)' : 'rgba(37, 37, 37, 1)',
                                        backgroundColor: item?.id === selectedCategory?.id ? 'rgba(53, 134, 255, 1)' : 'rgba(244, 244, 244, 1)',
                                    }}
                                >
                                    {item?.name}
                                </div>
                            )
                        }
                    </div>
                    <div className="catalog-main-find">
                        <FilterDropDown
                            sort={sort}
                            path={path}
                            brands={brands}
                        />
                        <SortDropDown
                            orderBy={orderBy}
                            order={order}
                            changeSort={changeSort}
                        />
                    </div>

                    {
                        products?.length <= 0
                            ?
                            <div className="catalog-main-not-found">
                                <NotFound/>
                            </div>
                            :
                            <div className="catalog-main-products">
                                {products?.map((item: any) =>
                                    <ProductItem
                                        path={path}
                                        item={item}
                                        key={item?.id}
                                    />
                                )}
                            </div>

                    }
                    <div className="catalog-main-pagination">
                        <CustomPagination
                            onChangePage={onChangePage}
                            sort={sort}
                            totalCount={totalCount}
                        />
                    </div>
                </div>
            </MaxWithLayout>
            <SeoSection seo={currentCategory?.acf?.category || mainData?.acf?.category}/>
        </div>
    );
};

export default CatalogContent;
