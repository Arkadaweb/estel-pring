import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import ConsultationsFormSection from "../../sections/ConsultationsFormSection";
import ButtonCustom from "../../components/common/ButtonCustom";
import {useConsultation} from "../../components/common/ConsultationFormProvider";

const DesignContent: FC<PropsWithChildren<any>> = ({
                               mainData
                           }) => {

    console.log(mainData)
    console.log(mainData?.acf?.design)

    const consultationU = useConsultation()

    const breadCrumbs = [
        {
            id: 1,
            path: '/',
            title: 'Главная'
        },
        {
            id: 2,
            path: '',
            title: 'Дизайн'
        }
    ]

    const itemsList = [1, 2, 3, 4]

    return (
        <>
            <MaxWithLayout>
                <div className="design-content">
                    <BreadCrumbs elements={breadCrumbs}/>

                    <h4>
                        Дизайн
                    </h4>

                    <p dangerouslySetInnerHTML={{__html: mainData?.content?.rendered || ''}}/>

                    {/*<p>*/}
                    {/*    Наши профессиональные дизайнеры выполнят любую задачу: от подготовки ваших макетов к печати до*/}
                    {/*    разработки концепции будущей рекламной конструкции с нуля.*/}
                    {/*</p>*/}
                    {/*<p>*/}
                    {/*    *Точная стоимость работ определяется после получения или составления технического задания. В*/}
                    {/*    стоимость работ не входит отдельно приобретаемый контент, используемый при создании макетов*/}
                    {/*    (фотобанки, лицензии на использование шрифтов и т.д.).*/}
                    {/*</p>*/}

                    <h5>
                        {mainData?.acf?.design?.title}
                    </h5>

                    <div className="design-content-items">
                        {
                            mainData?.acf?.design?.services?.map((item: any) =>
                                <div className="design-content-items-item">
                                    <h5>
                                        {item?.title}
                                    </h5>
                                    <h6>
                                        {item?.price}
                                    </h6>
                                    <p>
                                        {item?.description}
                                    </p>
                                    <div className="design-content-items-item-button">
                                        <ButtonCustom
                                            onPress={() => consultationU(true)}
                                            text={'Заказать'}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </MaxWithLayout>
            <ConsultationsFormSection/>
        </>
    );
};

export default DesignContent;
