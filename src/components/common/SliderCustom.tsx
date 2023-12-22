import React, {FC, PropsWithChildren, useState} from 'react';
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import LongArrowToLeft from "../../assets/icons/main/LongArrowToLeft";

const SliderCustom: FC<PropsWithChildren<any>> = ({
                                                      elements
                                                  }) => {


    const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

    let slider: any;

    const settings = {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
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
        setIsNextButtonDisabled(newIndex === slider?.props?.children?.length - 5);
    };


    return (
        <div className="slider-content">
            <div className="brand-section-content-top">
                <h3 style={{
                    fontSize: 38
                }}>
                    Похожие товары
                </h3>
                {
                    elements?.length > 4 &&
                    <div className="brand-section-content-top-buttons">
                        <button
                            className={`brand-section-left ${isPrevButtonDisabled ? 'disabled-slicer-popular' : ''}`}
                            onClick={goToPrev}
                            disabled={isPrevButtonDisabled}
                        >
                            <LongArrowToLeft/>
                        </button>
                        <button
                            className={`brand-section-right ${isNextButtonDisabled ? 'disabled-slicer-popular' : ''}`}
                            onClick={goToNext}
                            disabled={isNextButtonDisabled}
                        >
                            <LongArrowToLeft/>
                        </button>
                    </div>
                }

            </div>

            <Slider ref={(c) => (slider = c)} {...settings} beforeChange={handleBeforeChange}>
                {
                    elements?.map((item: any, index: any) =>
                        <div>
                            <div
                                key={index}
                                style={{
                                    width: '95%'
                                }}
                            >
                                <ProductItem item={item}/>
                            </div>
                        </div>
                    )
                }
            </Slider>
        </div>
    );
};

export default SliderCustom;