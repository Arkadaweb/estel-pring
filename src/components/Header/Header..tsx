import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import Link from "next/link";
import ProfileIcon from "../../assets/icons/header/ProfileIcon";
import FavoriteIcon from "../../assets/icons/header/FavoriteIcon";
import BucketIcon from "../../assets/icons/header/BucketIcon";
import LocationIcon from "../../assets/icons/header/LocationIcon";
import MainSearch from "../common/MainSearch";
import Image from "next/dist/client/legacy/image";

import logo from '../../../public/logo.png'
import SquaresIcon from "../../assets/icons/header/SquaresIcon";

const Header: FC<PropsWithChildren<any>> = ({}) => {


    const [searchText, setSearchText] = useState('')

    const navTop: any = [
        {
            id: 1,
            path: '',
            title: 'О компании'
        },
        {
            id: 2,
            path: '',
            title: 'Горячая линия'
        },
        {
            id: 3,
            path: '',
            title: 'Название страницы'
        },
        {
            id: 4,
            path: '',
            title: 'Название страницы'
        },
    ]

    return (
        <div className="header">
            <MaxWithLayout>
                <div className="header-top">
                    <div className="header-top-left">
                        <div className="header-top-left-location">
                            <LocationIcon/>
                            <p> Москва</p>
                        </div>
                        <div className="header-top-left-phone">
                            <a href={'tel:+7 000 000 00 00'}>
                                +7 000 000 00 00
                            </a>
                        </div>
                    </div>
                    <div className="header-top-nav">
                        {
                            navTop?.map((item: any) =>
                                <Link href={item?.path} key={item?.id}>
                                    {item?.title}
                                </Link>
                            )
                        }
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <Link href={'/'} className="header-bottom-left-logo">
                            <Image
                            src={logo}
                            />
                        </Link>
                        <Link href={'/complex'} className="header-bottom-left-link">
                            <SquaresIcon/>
                            <p>
                                Торговые комплексы
                            </p>
                        </Link>
                    </div>

                    <div className="header-bottom-search">
                        <MainSearch
                        placeholder={'Найти поставщика'}
                        />
                    </div>
                    <div className="header-bottom-nav">
                        <Link href={''} className="header-bottom-nav-item">
                            <ProfileIcon/>
                        </Link>
                        <Link href={''} className="header-bottom-nav-item">
                            <FavoriteIcon/>
                        </Link>
                        <Link href={''} className="header-bottom-nav-item">
                            <BucketIcon/>
                        </Link>
                    </div>
                </div>
            </MaxWithLayout>
        </div>
    );
};


export default Header;