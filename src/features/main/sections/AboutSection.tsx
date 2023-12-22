import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import Image from "next/dist/client/legacy/image";

import aboutShort from '../../../../public/main-about-short-image.png'
import aboutLong from '../../../../public/main-about-long-image.png'
import ButtonCustom from "../../../components/common/ButtonCustom";
import {useConsultation} from "../../../components/common/ConsultationFormProvider";

const AboutSection: FC<PropsWithChildren<any>> = ({
                          imagine
                      }) => {

    const consultationU = useConsultation()

    return (
        <MaxWithLayout>
            <div className="about-section">
                <div className="about-section-info">
                    <h3>
                        {imagine?.title}
                    </h3>
                    <div className="about-section-info-line"/>
                    <p dangerouslySetInnerHTML={{__html: imagine?.description || ''}}/>
                    <div className="about-section-info-button">
                        <ButtonCustom
                            onPress={() => consultationU(true)}
                            fontWeight={'500'}
                            text='Заказать звонок'
                            borderRadius={'50px'}
                        />
                    </div>
                </div>
                <div className="about-section-images">
                    <div className="about-section-images-short">
                        <Image
                            alt={imagine?.short_image?.alt}
                            title={imagine?.short_image?.title}
                            src={imagine?.short_image?.src}
                            layout={'fill'}
                            objectFit={'cover'}
                        />
                    </div>
                    <div className="about-section-images-long">
                        <Image
                            alt={imagine?.short_image?.alt}
                            title={imagine?.short_image?.title}
                            src={imagine?.long_image?.src}
                            layout={'fill'}
                            objectFit={'cover'}
                        />
                    </div>
                </div>
            </div>
        </MaxWithLayout>

    );
};

export default AboutSection;
