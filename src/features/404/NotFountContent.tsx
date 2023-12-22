import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import ButtonCustom from "../../components/common/ButtonCustom";
import {useRouter} from "next/router";

const NotFountContent: FC<PropsWithChildren<any>> = () => {

    const router = useRouter()
    const breadCrumbs = [
        {
            id: 1,
            path: '/',
            title: 'Главная'
        },
        {
            id: 2,
            path: '',
            title: '404'
        }
    ]

    return (
        <div className="not-fount">
            <MaxWithLayout>
                <div className="not-fount-content">
                    <BreadCrumbs elements={breadCrumbs}/>
                    <h1>
                        Ошибка 404
                    </h1>
                    <div className="not-fount-content-block">
                        <h3>
                            К сожалению, нужная страница не найдена
                        </h3>
                        <p>
                            Возможно, страница была удалена или был введен неверный адрес
                        </p>
                        <div className="not-fount-content-block-button">
                            <ButtonCustom
                                onPress={() => router.push('/')}
                                text={'На главную'}
                                paddong={'18px 30px'}
                                height={'50px'}
                            />
                        </div>
                    </div>
                </div>
            </MaxWithLayout>
        </div>
    );
};

export default NotFountContent;
