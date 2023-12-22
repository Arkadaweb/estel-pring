import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import Link from "next/link";

import Burger from "../../assets/icons/header/Burger";
import Image from "next/dist/client/legacy/image";
import logo from '../../../public/logo.png'
import WhatsApp from "../../assets/icons/header/WhatsApp";
import Viber from "../../assets/icons/header/Viber";
import BucketIcon from "../../assets/icons/header/BucketIcon";
import {useRouter} from "next/router";
import {useAppSelector} from "../../store/store";
import {formatPhoneNumber} from "../../help/formatPhoneNumber";
import ArrowToBottom from "../../assets/icons/common/ArrowToBottom";
import MainSearch from "../common/MainSearch";
import SearchIcon from "../../assets/icons/header/SearchIcon";

const HeaderMob: FC<PropsWithChildren<any>> = ({
                                                   categories = [],
                                                   contacts
                                               }) => {

    const router = useRouter();

    const {products} = useAppSelector(state => state.bucket)

    const [isOpenNav, setIsOpenNav] = useState<boolean>(false)
    const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false)
    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false)

    const headerMobRef = useRef<any>(null);
    const headerSearchRef = useRef<any>(null);

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

    const onSelectCategory = (url: string) => {
        router.push(url)
        setIsOpenNav(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (headerMobRef.current && !headerMobRef?.current?.contains(event.target)) {
                setIsOpenNav(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [headerMobRef]);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (headerSearchRef.current && !headerSearchRef?.current?.contains(event.target)) {
                setIsOpenSearch(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [headerSearchRef]);

    useEffect(() => {
        if (isOpenNav) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [isOpenNav]);

    return (
        <div className="header-mob">
            <div className={`header-mob-main ${isOpenNav ? 'header-mob-main-hide' : ''}`}>
                <MaxWithLayout>
                    <div className="header-mob-main-content">
                        <div className="header-mob-main-content-left" onClick={() => setIsOpenNav(true)}>
                            <Burger/>
                        </div>
                        <div className="header-mob-main-content-center">
                            <Link href={'/'}>
                                <Image
                                    src={logo}
                                />
                            </Link>
                        </div>
                        <div className="header-mob-main-content-right">
                            <div
                                className="header-mob-main-content-right-icon"
                                onClick={() => setIsOpenSearch(true)}
                            >
                                <SearchIcon/>
                            </div>
                            {
                                isOpenSearch &&
                                <div className="header-mob-main-content-right-search" ref={headerSearchRef}>
                                    <MainSearch
                                        placeholder={'Поиск по товару, бренду или артикулу'}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </MaxWithLayout>
            </div>

            <div className={`header-mob-side ${isOpenNav ? 'header-mob-side-open' : ''}`} ref={headerMobRef}>
                <div className="header-mob-side-title">
                    <Link href={'/'}>
                        <Image
                            src={logo}
                        />
                    </Link>
                </div>
                <div className="header-mob-side-top-nav-bottom">
                    <h4 onClick={() => setIsOpenCatalog(!isOpenCatalog)}>
                        Каталог
                        <ArrowToBottom color={'#000'}/>
                    </h4>
                    <div className={`header-mob-side-top-nav-bottom-drop ${isOpenCatalog && 'category-open'}`}>
                        <p onClick={() => onSelectCategory(`/catalog`)}>
                            Все
                        </p>
                        {
                            categories?.map((item: any) =>
                                <p key={item?.id} onClick={() => onSelectCategory(`/catalog/${item.slug}`)}>
                                    {item?.name}
                                </p>
                            )
                        }
                    </div>
                </div>
                <div className="header-mob-side-top-nav">
                    {
                        navTop?.map((item: any) =>
                            <Link href={item.path}>
                                {item?.title}
                            </Link>
                        )
                    }
                </div>
                <div className="header-mob-side-icons">
                    <Link href={'/bucket'} className="header-mob-side-icons-item-bucket">
                        <BucketIcon/>
                        {
                            products?.length > 0 &&
                            <div className="header-mob-side-icons-item-bucket-count">
                                {products?.length}
                            </div>
                        }
                    </Link>
                </div>
                <div className="header-mob-side-icons">
                    {
                        contacts?.socials?.map((item: any) =>
                            <a href={item.link} className="header-mob-side-icons-item-icon">
                                <Image
                                    width={25}
                                    height={25}
                                    src={item.icon}
                                />
                            </a>
                        )
                    }
                    {/*<a href={''} className="header-mob-side-icons-item-icon">*/}
                    {/*    <WhatsApp/>*/}
                    {/*</a>*/}
                    {/*<a href={''} className="header-mob-side-icons-item-icon">*/}
                    {/*    <Viber/>*/}
                    {/*</a>*/}
                </div>
                <div className="header-mob-side-phone">
                    {
                        formatPhoneNumber(contacts?.phone)
                    }
                </div>
            </div>
        </div>
    );
};

export default HeaderMob;
