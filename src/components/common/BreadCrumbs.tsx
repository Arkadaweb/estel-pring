import React, {FC, PropsWithChildren} from 'react';
import Link from "next/link";
import ArrowToRight from "../../assets/icons/header/ArrowToRight";

const BreadCrumbs: FC<PropsWithChildren<any>> = ({
                                                     elements,
                                                     isWhite = false
                                                 }) => {

    return (
        <ul className="bread-crumbs">
            {
                elements?.map((item: any, index: any) => {
                    return (
                        <li
                            key={index}
                            style={{
                                color: isWhite ? 'rgba(255, 255, 255, 0.8)' : 'rgba(37, 37, 37, 0.8)'
                            }}
                        >
                            <Link href={item?.path}>
                                {item?.title}
                            </Link>
                            {index !== elements?.length - 1 && ' /'}
                        </li>
                    )
                })
            }
            <Link
                href={elements?.length > 0 ?elements[elements?.length - 2]?.path : '/'}
                className="bread-crumbs-back"
                style={{
                    color: isWhite ? 'rgba(255, 255, 255, 0.8)' : 'rgba(37, 37, 37, 0.8)'
                }}
            >
                <ArrowToRight/>
                Назад
            </Link>
        </ul>
    );
};

export default BreadCrumbs;