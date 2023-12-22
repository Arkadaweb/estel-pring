import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import Link from "next/link"
import logoArcada from '../../../public/logo-arcada.png'
import whiteLogo from '../../../public/white-logo.png'
import WhatsApp from "../../assets/icons/header/WhatsApp";
import Viber from "../../assets/icons/header/Viber";
import Image from "next/dist/client/legacy/image";
import {formatPhoneNumber} from "../../help/formatPhoneNumber";


const Footer: FC<PropsWithChildren<any>> = ({
                                                footerMarginTop = 160,
                                                contacts
}) => {

    const navTop: any = [
        {
            id: 1,
            path: '',
            title: 'Услуги'
        },
        {
            id: 2,
            path: '',
            title: 'Требования к макетам'
        },
        {
            id: 3,
            path: '',
            title: 'Доставка и оплата'
        },
        {
            id: 4,
            path: '',
            title: 'Дизайн'
        },
        {
            id: 5,
            path: '',
            title: 'Контакты'
        },
    ]


    return (
        <div className="footer" style={{marginTop: footerMarginTop}}>
            <MaxWithLayout>
                <div className="footer-top">
                    <div className="footer-top-block">
                        <h3>
                            <Image
                                alt={'logo'}
                                title={'Логотик компании'}
                                src={whiteLogo}
                            />
                        </h3>
                        <p>
                            Качественная печать и эксклюзивный дизайн конструкций для выставок в Москве — основное
                            направление работы фирмы с 2000 года.
                        </p>
                        <div className="footer-top-block-phones hide-mob">
                            {
                                contacts?.socials?.map((item: any) =>
                                    <a href={item.link}>
                                        <Image
                                            alt={'icon'}
                                            title={'Иконка меседжера'}
                                            width={52}
                                            height={52}
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

                    <div className="footer-top-block hide-mob">
                        <div className="footer-top-block-title">
                            Клиентам
                        </div>
                        <div className="footer-top-block-nav">
                            {
                                navTop.map((item: any) =>
                                    <Link href={item.path} key={item.id}>
                                        {item.title}
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                    <div className="footer-top-block">
                        <div className="footer-top-block-title">
                            Контакты
                        </div>
                        <div className="footer-top-block-number">
                            <a href={`tel:${contacts?.phone}`}>
                                {
                                    formatPhoneNumber(contacts?.phone)
                                }
                            </a>
                        </div>
                        <div className="footer-top-block-nav">
                            <p className="footer-top-block-nav">
                                {
                                    contacts?.address
                                }
                            </p>
                            <p>
                                {
                                    contacts?.work
                                }
                            </p>
                            <p>
                                {
                                    contacts?.email
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-line"/>

                <div className="footer-bottom">
                    <p>
                        © 2023 Все права защищены
                    </p>
                    <Link href={'/policy-privacy'}>
                        Политика конфиденциальности
                    </Link>
                    <Link href={''}>
                        <Image
                            alt={'logo'}
                            title={'Логотик компании создателя сайта'}
                            src={logoArcada}
                        />
                    </Link>

                </div>
            </MaxWithLayout>
        </div>
    );
};

export default Footer;
