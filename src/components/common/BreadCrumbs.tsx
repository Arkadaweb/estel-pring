import React, {FC, PropsWithChildren} from 'react';
import Link from "next/link";
import ArrowToRight from "../../assets/icons/main/ArrowToRight";

const BreadCrumbs: FC<PropsWithChildren<any>> = ({elements}) => {

    return (
        <ul className="bread-crumbs">
            {
                elements.map((item: any, index: any) => {
                    return (
                        <li key={index}>
                            <Link href={item.path}>
                                {item.title}
                            </Link>
                            {index !== elements.length - 1 && ' /'}
                        </li>
                    )
                })
            }
            <Link href={elements[elements?.length - 2]?.path} className="bread-crumbs-back">
                <ArrowToRight/>
                Назад
            </Link>
        </ul>
    );
};

export default BreadCrumbs;