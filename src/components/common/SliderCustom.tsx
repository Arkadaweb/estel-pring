import React, {FC, useState} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import ArrowToDown from "../../assets/icons/common/ArrowToDown";
import index from "redux-persist/types/tests/index";

const SliderCustom: FC = () => {

    const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

    let slider: any;

    const settings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 650,
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
        setIsNextButtonDisabled(newIndex === slider.props.children.length - 5);
    };

    const sliderItems = [1, 2, 3, 4, 5, 6, 7]

    return (
        <MaxWithLayout>
            <div className="slider-content">
                <div className="slider-content-buttons">
                    <button
                        className={`slider-content-button-left ${isPrevButtonDisabled ? 'disabled' : ''}`}
                        onClick={goToPrev}
                        disabled={isPrevButtonDisabled}
                    >
                        <ArrowToDown/>
                    </button>
                    <button
                        className={`slider-content-button-right ${isNextButtonDisabled ? 'disabled' : ''}`}
                        onClick={goToNext}
                        disabled={isNextButtonDisabled}
                    >
                        <ArrowToDown/>
                    </button>
                </div>

                <Slider ref={(c) => (slider = c)} {...settings} beforeChange={handleBeforeChange}>
                    {
                        sliderItems.map((item: any, index: any) =>
                            <div>
                                <div key={index} style={{ marginRight: 30 }}>
                                    <ProductItem/>
                                </div>
                            </div>
                        )
                    }
                </Slider>
            </div>
        </MaxWithLayout>
    );
};

export default SliderCustom;