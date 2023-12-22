import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import ProductItem from "../../components/common/ProductItem";
import SortDropDown from "../../components/common/SortDropDown";
import FilterDropDown from "../../components/common/FilterDropDown";
import queryString from "query-string";
import {useRouter} from "next/router";
import NotFound from "../../components/common/NotFound";

const SearchContent: FC<PropsWithChildren<any>> = ({
                                                       products,
                                                       totalCount,
                                                       sort,
                                                       brands,
                                                       categories,
                                                       search,
                                                       path
                                                   }) => {

    const orderBy = sort?.orderby
    const order = sort?.order

    const router = useRouter()

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

    const breadCrumbs = [
        {
            id: 1,
            path: '/',
            title: 'Главная'
        },
        {
            id: 2,
            path: '',
            title: 'Результаты поиска'
        }
    ]


    return (
        <MaxWithLayout>
            <div className="search-content">
                <BreadCrumbs elements={breadCrumbs}/>

                <h1 className="search-content-title">
                    Результаты поиска по запросу “{search}”
                </h1>

                <div className="search-content-find">
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
                        <div className="search-content-not-found">
                            <NotFound/>
                        </div>
                        :
                        <div className="search-content-items">
                            {
                                products?.map((item: any) =>
                                    <ProductItem
                                        item={item}
                                        key={item?.id}
                                    />
                                )
                            }
                        </div>
                }

            </div>
        </MaxWithLayout>
    );
};

export default SearchContent;
