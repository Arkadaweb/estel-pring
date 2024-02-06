import React, {FC, PropsWithChildren, useState} from 'react';
import Slider from 'react-slick';

import slideImage from '../../../../public/intro-iamge.png'
import ButtonCustom from "../../../components/common/ButtonCustom";
import LongArrowToLeft from "../../../assets/icons/main/LongArrowToLeft";

import testIntroImage from '../../../../public/testIntroImage.png'
import {useConsultation} from "../../../components/common/ConsultationFormProvider";
import Image from "next/dist/client/legacy/image";

const IntroSection: FC<PropsWithChildren<any>> = ({
                              banner
                          }) => {

    const consultationU = useConsultation()

    const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

    let slider: any;

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 6000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: true
                }
            },
        ]
    };

    const goToNext = () => {
        slider.slickNext();
    };

    const goToPrev = () => {
        slider.slickPrev();
    };

    const handleBeforeChange = (oldIndex: any, newIndex: any) => {
        setIsPrevButtonDisabled(newIndex === 0);
        setIsNextButtonDisabled(newIndex === slider.props.children.length - 1);
    };

    return (
        <div className="intro-section">
            <Slider ref={(c) => (slider = c)} {...settings} beforeChange={handleBeforeChange}>
                {
                    banner?.slides?.map((item: any, index: any) =>
                        <div className="slide-item">
                            <Image
                                layout={'fill'}
                                src={item?.image}
                                alt={item?.alt}
                                title={item?.title}
                                style={{width: '100%', height: 733}}
                            />
                            <div className="slide-item-inner">
                                <div className="slide-item-inner-content">
                                    {/*<h2>*/}
                                    {/*    {item?.name}*/}
                                    {/*    /!*Мобильные стенды <br/>*!/*/}
                                    {/*    /!*для выставок и презентаций*!/*/}
                                    {/*</h2>*/}
                                    <h1 dangerouslySetInnerHTML={{__html: item?.name || ''}}/>
                                    <p>
                                        {item?.short}
                                        {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod*/}
                                        {/*tempor incididunt ut labore et dolore magna aliqua.*/}
                                    </p>
                                    <ButtonCustom
                                        onPress={() => consultationU(true)}
                                        padding={'18px 30px'}
                                        text={'Заказать звонок'}
                                        borderRadius={50}
                                        fontWeight={500}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }
            </Slider>
            <div className="slider-controls">
                <button
                    className={`slider-control-left ${isPrevButtonDisabled ? 'disabled' : ''}`}
                    onClick={goToPrev}
                    disabled={isPrevButtonDisabled}
                >
                    <LongArrowToLeft/>
                </button>
                <button
                    className={`slider-control-right ${isNextButtonDisabled ? 'disabled' : ''}`}
                    onClick={goToNext}
                    disabled={isNextButtonDisabled}
                >
                    <LongArrowToLeft/>
                </button>
            </div>
        </div>
    );
};

export default IntroSection;
