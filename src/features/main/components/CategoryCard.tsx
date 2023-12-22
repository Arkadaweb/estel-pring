import React, {FC, PropsWithChildren} from 'react';
import Image from "next/dist/client/legacy/image";

import testCategoryCardImg from '../../../../public/testCategoryCardImg.png'
import Link from "next/link";

const CategoryCard: FC<PropsWithChildren<any>> = ({item}) => {

    return (
        <Link href={`/catalog/${item?.slug}`} className="category-card">
            <div className="category-card-img">
                <Image
                    alt={item?.alt}
                    title={item?.title}
                    layout={'fill'}
                    src={item?.image?.src}
                />
            </div>
            <div className="category-card-text">
                {item?.name}
            </div>
        </Link>
    );
};

export default CategoryCard;
