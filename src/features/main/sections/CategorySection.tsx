import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import CategoryCard from "../components/CategoryCard";

const CategorySection: FC<PropsWithChildren<any>> = ({
                                                         categories
                                                     }) => {

    return (
        <div className="category-section">
            <MaxWithLayout>
                <h3 className="category-section-title">
                    {
                        categories?.title
                    }
                </h3>
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
