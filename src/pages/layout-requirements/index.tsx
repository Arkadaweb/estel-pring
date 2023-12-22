import React, {FC, PropsWithChildren} from 'react';
import Meta from "../../seo/Meta";
import MainLayout from "../../layouts/MainLayout";
import LayoutRequirementsContent from "../../features/layout-requirements/LayoutRequirementsContent";
import {api, get} from "../../api/request";

const LayoutRequirements: FC<PropsWithChildren<any>> = ({
                                                            categories,
                                                            contacts,
                                                            mainData
                                                        }) => {

    console.log(mainData)

    return (
        <Meta title={'Требования к макетам'}>
            <MainLayout contacts={contacts} categories={categories}>
                <LayoutRequirementsContent mainData={mainData}/>
            </MainLayout>
        </Meta>
    );
};

export async function getStaticProps() {

    try {
        const wooCommerceCategories: any = await api.get("products/categories");
        const contacts: any = await get(`wp-json/wp/v3/options`);
        const mainData: any = await get(`wp-json/wp/v2/pages/180`);

        return {
            props: {
                categories: wooCommerceCategories?.data || [],
                contacts: contacts || {},
                mainData: mainData || {},
            },
            revalidate: 60,
        }
    } catch (e) {
        return {
            props: {
                categories: [],
                contacts: {},
                mainData: {}
            },
            revalidate: 60,
        }
    }
}

export default LayoutRequirements;
