import React, {FC, useState} from 'react';
import Slider from 'react-slick';

import Image from "next/image";

import slideImage from '../../../../public/intro-iamge.png'
import ArrowToLeft from "../../../assets/icons/lending/ArrowToLeft";
import ArrowToRight from "../../../assets/icons/lending/ArrowToRight";
import ButtonCustom from "../../../components/common/ButtonCustom";

const IntroSection: FC = () => {

    const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

    let slider: any;

    const settings = {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
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
                <div className="slide-item">
                    <Image src={slideImage} alt="Slide 1" style={{width: '100%', height: 620}}/>
                    <div className="slide-item-inner">
                        <div className="slide-item-inner-content">
                            <h2>
                                Большой выбор профессиональной
                                косметики для лица и тела
                            </h2>
                            <p>
                                Лучшие бренды профессиональной космецевтики :
                                IMAGE SKINCARE, SESDERMA, GIGI, HYDROPEPTIDE, OBAGI и многие другие.
                            </p>
                            <ButtonCustom
                                text={'Перейти к брендам'}
                            />
                        </div>
                    </div>
                </div>
                <div className="slide-item">
                    <Image src={slideImage} alt="Slide 2" style={{width: '100%', height: 620}}/>
                </div>
                <div className="slide-item">
                    <Image src={slideImage} alt="Slide 3" style={{width: '100%', height: 620}}/>
                </div>
            </Slider>
            <div className="slider-controls">
                <button
                    className={`slider-control-left ${isPrevButtonDisabled ? 'disabled' : ''}`}
                    onClick={goToPrev}
                    disabled={isPrevButtonDisabled}
                >
                    <ArrowToLeft/>
                </button>
                <button
                    className={`slider-control-right ${isNextButtonDisabled ? 'disabled' : ''}`}
                    onClick={goToNext}
                    disabled={isNextButtonDisabled}
                >
                    <ArrowToRight/>
                </button>
            </div>
        </div>
    );
};

export default IntroSection;