import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import BreadCrumbs from "../../components/common/BreadCrumbs";

const DeliveryPaymentContent: FC<PropsWithChildren<any>> = ({
                                    mainData
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
            title: 'Доставка и оплата'
        }
    ]

    return (
        <MaxWithLayout>
            <div className="delivery-payment-content">
                <BreadCrumbs elements={breadCrumbs}/>

                <h3>
                    Доставка и оплата
                </h3>
                <p dangerouslySetInnerHTML={{__html: mainData?.content?.rendered || ''}}/>

                {/*<h4>*/}
                {/*    Доставка*/}
                {/*</h4>*/}
                {/*<p>*/}
                {/*    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore*/}
                {/*    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut*/}
                {/*    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse*/}
                {/*    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in*/}
                {/*    culpa qui officia deserunt mollit anim id est laborum.*/}
                {/*</p>*/}

                {/*<h4>*/}
                {/*    Оплата*/}
                {/*</h4>*/}
                {/*<p>*/}
                {/*    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore*/}
                {/*    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut*/}
                {/*    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse*/}
                {/*    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in*/}
                {/*    culpa qui officia deserunt mollit anim id est laborum.*/}
                {/*</p>*/}
            </div>
        </MaxWithLayout>
    );
};

export default DeliveryPaymentContent;
