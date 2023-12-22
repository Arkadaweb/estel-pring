import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import Link from "next/link";
import MainSearch from "../common/MainSearch";
import WhatsApp from "../../assets/icons/header/WhatsApp";
import Viber from "../../assets/icons/header/Viber";

import logo from '../../../public/logo.png'
import Image from "next/dist/client/legacy/image";
import BucketIcon from "../../assets/icons/header/BucketIcon";
import CategoryDropDown from "./CategoryDropDown";
import {useAppSelector} from "../../store/store";
import {formatPhoneNumber} from "../../help/formatPhoneNumber";

const Header: FC<PropsWithChildren<any>> = ({
                                                categories,
                                                contacts
                                            }) => {

    const {products} = useAppSelector(state => state.bucket)

    const navTop: any = [
        {
            id: 1,
            path: '/services',
            title: 'Услуги'
        },
        {
            id: 2,
            path: '/layout-requirements',
            title: 'Требования к макетам'
        },
        {
            id: 3,
            path: '/delivery-payment',
            title: 'Доставка и оплата'
        },
        {
            id: 4,
            path: '/design',
            title: 'Дизайн'
        },
        {
            id: 5,
            path: '/contact',
            title: 'Контакты'
        },
    ]

    return (
        <div className="header">
            <MaxWithLayout>
                <div className="header-top">
                    <div className="header-top-nav">
                        {
                            navTop?.map((item: any) =>
                                <Link href={item?.path} key={item?.id}>
                                    {item?.title}
                                </Link>
                            )
                        }
                    </div>
                    <div className="header-top-contact">
                        <a href={`tel:${contacts?.phone}`}>
                            {
                                formatPhoneNumber(contacts?.phone)
                            }
                        </a>
                        <div className="header-top-contact-social">
                            {
                                contacts?.socials?.map((item: any) =>
                                    <a href={item.link}>
                                        <Image
                                            alt={'icon'}
                                            title={'Иконка меседжера'}
                                            width={25}
                                            height={25}
                                            src={item.icon}
                                        />
                                    </a>
                                )
                            }
                            {/*<a href="">*/}
                            {/*    <WhatsApp/>*/}
                            {/*</a>*/}
                            {/*<a href="">*/}
                            {/*    <Viber/>*/}
                            {/*</a>*/}
                        </div>
                    </div>
                </div>
            </MaxWithLayout>

            <div className="header-line"/>

            <MaxWithLayout>

                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <Link href={'/'} className="header-bottom-left-logo">
                            <Image
                                alt={'logo'}
                                title={'Логотик компании'}
                                src={logo}
                            />
                        </Link>
                        <div className="header-bottom-left-drop-down">
                            <CategoryDropDown categories={categories}/>
                        </div>
                    </div>

                    <div className="header-bottom-search">
                        <MainSearch
                            placeholder={'Поиск по товару, бренду или артикулу'}
                        />
                    </div>
                    <Link href={'/bucket'} className="header-bottom-bucket">
                        <BucketIcon/>
                        {
                            products?.length > 0 &&
                            <div className="header-bottom-bucket-count">
                                {products?.length}
                            </div>
                        }
                    </Link>

                </div>
            </MaxWithLayout>

        </div>
    );
};


export default Header;
