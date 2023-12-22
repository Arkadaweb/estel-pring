import React, {FC, useState} from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import Slider from "react-slick";
import slideImage from "../../../../public/intro-iamge.png";
import ArrowToLeft from "../../../assets/icons/lending/ArrowToLeft";
import ArrowToRight from "../../../assets/icons/lending/ArrowToRight";
import ProductItem from "../../../components/common/ProductItem";

const PopularSection: FC = () => {

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

    const sliderItems = [
        {
            id: 1,
            img: slideImage,
            desc: 'Skin Deva 100% Pure Hyaluronic Acid Сыворотка...',
            price: '20 000',
            isFavorite: true,
            type: 'new',
            oldPrice: ''
        },
        {
            id: 2,
            img: slideImage,
            desc: 'Skin Deva 100% Pure Hyaluronic Acid Сыворотка...',
            price: '20 000',
            isFavorite: false,
            type: 'sale',
            oldPrice: ''
        },
        {
            id: 3,
            img: slideImage,
            desc: 'Skin Deva 100% Pure Hyaluronic Acid Сыворотка...',
            price: '20 000',
            isFavorite: false,
            type: '',
            oldPrice: '20 000'
        },
        {
            id: 4,
            img: slideImage,
            desc: 'Skin Deva 100% Pure Hyaluronic Acid Сыворотка...',
            price: '20 000',
            isFavorite: false,
            type: '',
            oldPrice: '20 000'
        },
        {
            id: 5,
            img: slideImage,
            desc: 'Skin Deva 100% Pure Hyaluronic Acid Сыворотка...',
            price: '20 000',
            isFavorite: false,
            type: '',
            oldPrice: '20 000'
        },
        {
            id: 6,
            img: slideImage,
            desc: 'Skin Deva 100% Pure Hyaluronic Acid Сыворотка...',
            price: '20 000',
            isFavorite: false,
            type: '',
            oldPrice: '20 000'
        },
    ]

    return (
        <div className="popular">
            <MaxWithLayout>
                <div className="popular-content">
                    <div className="popular-content-top">
                        <h3>
                            Популярные товары
                        </h3>
                        <div className="popular-content-top-buttons">
                            <button
                                className={`slider-popular ${isPrevButtonDisabled ? 'disabled-slicer-popular' : ''}`}
                                onClick={goToPrev}
                                disabled={isPrevButtonDisabled}
                            >
                                <ArrowToLeft/>
                            </button>
                            <button
                                className={`slider-popular ${isNextButtonDisabled ? 'disabled-slicer-popular' : ''}`}
                                onClick={goToNext}
                                disabled={isNextButtonDisabled}
                            >
                                <ArrowToRight/>
                            </button>
                        </div>
                    </div>

                    <Slider ref={(c) => (slider = c)} {...settings} beforeChange={handleBeforeChange}>
                        {
                            sliderItems.map((item: any) =>
                                <div key={item.id}>
                                    <ProductItem item={item}/>
                                </div>
                            )
                        }
                    </Slider>
                </div>
            </MaxWithLayout>
        </div>
    );
};

export default PopularSection;