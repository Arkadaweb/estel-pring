import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import PopupIcon from "../../assets/icons/header/PopupIcon";
import ArrowToTop from "../../assets/icons/common/ArrowToTop";
import ArrowToBottom from "../../assets/icons/common/ArrowToBottom";
import Link from "next/link";
// import ArrowToBottom from "../../assets/icons/common/ArrowToBottom";

const CategoryDropDown: FC<PropsWithChildren<any>> = ({
                                                          categories = []
                                                      }) => {

    const sortRef = useRef<any>(null);

    return (
        <Link href={'/catalog'} className="cat-d-d" ref={sortRef}>
            <div
                className="cat-d-d-title"
            >
                <span>
                   <PopupIcon/>
                </span>
                <p>
                    Каталог продукции
                </p>
                <span className={`rotate-icon`}>
                    <ArrowToBottom/>
                </span>
            </div>

            <div className="cat-d-d-popup">
                {
                    categories?.map((item: any) =>
                        <Link
                            key={item?.id}
                            href={`/catalog/${item.slug}`}
                            // className={`${item?.subMenu?.length > 0 ? 'cat-d-d-popup-with-sub' : ''}`}
                        >
                            {item?.name}
                            {/*{item?.subMenu?.length > 0 &&*/}
                            {/*<ArrowToTop/>*/}
                            {/*}*/}
                            {/*<div className="cat-d-d-popup-sub">*/}
                            {/*    {*/}
                            {/*        item?.subMenu?.map((item: any) =>*/}
                            {/*            <p*/}
                            {/*                key={item}*/}
                            {/*            >*/}
                            {/*                {item}*/}
                            {/*            </p>*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</div>*/}
                        </Link>
                    )
                }
            </div>

        </Link>
    );
};

export default CategoryDropDown;