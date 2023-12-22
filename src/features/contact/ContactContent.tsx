import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import ConsultationsFormSection from "../../sections/ConsultationsFormSection";
import {formatPhoneNumber} from "../../help/formatPhoneNumber";

const ContactContent: FC<PropsWithChildren<any>> = ({
                                contacts
                            }) => {

    console.log(contacts)

    const breadCrumbs = [
        {
            id: 1,
            path: '/',
            title: 'Главная'
        },
        {
            id: 2,
            path: '',
            title: 'Контакты'
        }
    ]

    return (
        <>
            <MaxWithLayout>
                <div className="contacts">
                    <BreadCrumbs elements={breadCrumbs}/>
                    <h1 className="contacts-title">
                        Контакты
                    </h1>

                    <div className="contacts-content">
                        <div className="contacts-content-info">
                            <div className="contacts-content-info-block">
                                <h6>
                                    Адрес:
                                </h6>
                                <p>
                                    {
                                        contacts?.address
                                    }
                                </p>
                            </div>
                            <div className="contacts-content-info-block">
                                <h6>
                                    Метро:
                                </h6>
                                <p>

                                    {
                                        contacts?.metro
                                    }
                                </p>
                            </div>
                            <div className="contacts-content-info-block">
                                <h6>
                                    Режим работы:
                                </h6>
                                <p>
                                    {
                                        contacts?.work
                                    }
                                </p>
                            </div>
                            <div className="contacts-content-info-block">
                                <h6>
                                    Телефон:
                                </h6>
                                <p>
                                    <a href={`tel:${contacts?.phone}`}>
                                        {
                                            formatPhoneNumber(contacts?.phone)
                                        }
                                    </a>
                                </p>
                            </div>
                            <div className="contacts-content-info-block">
                                <h6>
                                    E-mail:
                                </h6>
                                <p>
                                    {
                                        contacts?.email
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="contacts-content-map">
                            <iframe
                                src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac4f7735f0c40bb17d8989ea42a95daa62d9d4e64b4b958c9ec61cc84f7d46c09&amp;source=constructor"
                                width="100%" height="100%" frameBorder="0"></iframe>
                        </div>
                    </div>
                </div>
            </MaxWithLayout>
            <ConsultationsFormSection/>
        </>
    );
};

export default ContactContent;
