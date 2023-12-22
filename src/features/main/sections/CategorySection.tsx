import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import CategoryCard from "../components/CategoryCard";

const CategorySection: FC<PropsWithChildren<any>> = ({
                                                         categories
                                                     }) => {

    return (
        <div className="category-section">
            <MaxWithLayout>
                <div className="category-section-title">
                    {
                        categories?.title
                    }
                </div>
                <div className="category-section-items">
                    {
                        categories?.items?.map((item: any) =>
                            <CategoryCard item={item} key={item?.name}/>
                        )
                    }
                </div>
            </MaxWithLayout>
        </div>
    );
};

export default CategorySection;
