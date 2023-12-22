import React, {FC, PropsWithChildren, useState} from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import Slider from "react-slick";
import LongArrowToLeft from "../../../assets/icons/main/LongArrowToLeft";
import Image from "next/dist/client/legacy/image";

import testSlideImage from '../../../../public/testSlideImage.png'
import Link from "next/link";

const Brands: FC<PropsWithChildren<any>> = ({
                                                brands
                                            }) => {


    const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

    let slider: any;

    const settings = {
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 450,
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
        setIsNextButtonDisabled(newIndex === slider.props.children.length - 6);
    };

    const sliderItems = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className="brand-section">
            <MaxWithLayout>
                <div className="brand-section-content">
                    <div className="brand-section-content-top">
                        <h3>
                            Бренды, с которыми работаем
                        </h3>
                        <div className="brand-section-content-top-buttons hide-buttons">
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
                    </div>

                    <Slider
                        className="brand-slider"
                        ref={(c) => (slider = c)}
                        {...settings}
                        beforeChange={handleBeforeChange}
                    >
                        {
                            brands?.map((item: any) =>
                                <Link href={`/catalog?attribute=pa_brand&attribute_term=${item?.id}`}  key={item.id} className="brand-section-img">
                                    <Image
                                        layout={'fill'}
                                        objectFit={'cover'}
                                        src={item?.src?.image}
                                    />
                                </Link>
                            )
                        }
                    </Slider>
                </div>
            </MaxWithLayout>
        </div>
    );
};

export default Brands;
