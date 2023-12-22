import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import ConsultationsFormSection from "../../sections/ConsultationsFormSection";

const ServicesContent: FC<PropsWithChildren<any>> = ({
                                                         table = []
                                                     }) => {
    const breadCrumbs = [
        {
            id: 1,
            path: '/',
            title: 'Главная'
        },
        {
            id: 2,
            path: '',
            title: 'Услуги'
        }
    ]

    return (
        <>
            <MaxWithLayout>
                <div className="services-content">
                    <BreadCrumbs elements={breadCrumbs}/>
                    <h1>
                        Услуги
                    </h1>
                    <table>
                        <thead>
                        <tr>
                            <th className="column1">Наименование услуги</th>
                            <th className="column2">Стоимость (рублей)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            table.map((item: any) =>
                                <tr>
                                    <td className="column1">{item?.name}</td>
                                    <td className="column1">{item?.value}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </MaxWithLayout>
            <ConsultationsFormSection/>
        </>
    );
};

export default ServicesContent;
