import React, {FC} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import {useAppSelector} from "../../store/store";
import dayjs from "dayjs";

const FinishBucket: FC = () => {

    const breadCrumbs = [
        {
            id: 1,
            path: '/',
            title: 'Главная'
        },
        {
            id: 2,
            path: '',
            title: 'Спасибо за заказ'
        }
    ]


    const {payment} = useAppSelector((state: any) => state.bucket)

    return (
        <MaxWithLayout>
            <div className="finish-bucket-content">
                <BreadCrumbs elements={breadCrumbs}/>
                <h4>
                    Спасибо за заказ!
                </h4>

                <div className="finish-bucket-content-order">
                    <div className="finish-bucket-content-order-title">
                        Заказ № 12345
                    </div>
                    <div className="finish-bucket-content-order-items">
                        {
                            payment?.line_items?.map((item:any) =>
                                <div className="finish-bucket-content-order-items-item">
                                    <h5>
                                        {item?.name} х{item?.quantity}
                                    </h5>
                                    <div className="finish-bucket-content-order-items-item-line"/>
                                    <p>
                                        {Number(item?.price) * Number(item?.quantity)} ₽
                                    </p>
                                </div>
                            )
                        }
                    </div>
                    <div className="finish-bucket-content-order-price">
                        Итого: <span>{payment?.total} ₽</span>
                    </div>
                </div>

                <div className="finish-bucket-content-data">
                    <div className="finish-bucket-content-data-block">
                        <h5>
                            Дата:
                        </h5>
                        <p>
                            {payment?.date_created ? dayjs(payment?.date_created).format('DD.MM.YYYY') : '---'}
                        </p>
                    </div>
                    <div className="finish-bucket-content-data-block">
                        <h5>
                            E-mail:
                        </h5>
                        <p>
                            {payment?.billing?.email || '---'}
                        </p>
                    </div>
                    <div className="finish-bucket-content-data-block">
                        <h5>
                            Телефон:
                        </h5>
                        <p>
                            {payment?.billing?.phone || '---'}
                        </p>
                    </div>
                    <div className="finish-bucket-content-data-block">
                        <h5>
                            Способ доставки:
                        </h5>
                        <p>
                            {
                                payment?.billing?.city
                                    ? payment?.billing?.city + ' ' + payment?.billing?.address
                                    : 'Самовывоз'
                            }
                        </p>
                    </div>
                </div>
            </div>
        </MaxWithLayout>
    );
};

export default FinishBucket;
