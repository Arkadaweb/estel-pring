import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import Link from "next/link";
import ProfileIcon from "../../assets/icons/header/ProfileIcon";
import FavoriteIcon from "../../assets/icons/header/FavoriteIcon";
import BucketIcon from "../../assets/icons/header/BucketIcon";
import Image from "next/dist/client/legacy/image";

import logo from '../../../public/logo.png'
import Burger from "../../assets/icons/header/Burger";


const HeaderMob: FC<PropsWithChildren<any>> = ({
                                                   menu
                                               }) => {

    const [isOpenNav, setIsOpenNav] = useState<boolean>(false)

    const headerMobRef = useRef<any>(null);

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
            title: 'Торговые комплексы'
        },
        {
            id: 4,
            path: '',
            title: 'Название страницы'
        },
        {
            id: 5,
            path: '',
            title: 'Название страницы'
        },
    ]


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
                        <div className="header-main-main-mob-content-right">

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
                    <Link href={'/profile'} className="header-mob-side-icons-item-icon">
                        <ProfileIcon/>
                    </Link>
                    <Link href={'/favorite'} className="header-mob-side-icons-item-icon">
                        <FavoriteIcon/>
                    </Link>
                    <Link href={'/bucket'} className="header-mob-side-icons-item-icon">
                        <BucketIcon/>
                    </Link>
                </div>
                <div className="header-mob-side-phone">
                    <a href="tel:+123456789">
                        {/*<PhoneIcon/>*/}
                        +7 000 000 00 00
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HeaderMob;