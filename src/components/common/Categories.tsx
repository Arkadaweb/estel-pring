import React, {FC, PropsWithChildren, useRef, useState} from 'react';
import Image from "next/dist/client/legacy/image";
import slideImage from "../../../public/testSlideImage.png";
import Slider from "react-slick";
import ArrowToRight from "../../assets/icons/main/ArrowToRight";
import ArrowToBottom from "../../assets/icons/common/ArrowToBottom";

const Categories: FC<PropsWithChildren<any>> = ({}) => {

    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null)

    const categories = [
        {
            id: 1,
            title: 'Одежда',
            subCategory: [
                {
                    id: '5',
                    title: 'Крутые куртки',
                }
            ]
        },
        {
            id: 3,
            title: 'Головные уборы',
        },
        {
            id: 4,
            title: 'Головные',
        },
        {
            id: 5,
            title: 'Уборы',
            subCategory: [
                {
                    id: '7',
                    title: 'Крутые шапки',
                }
            ]
        },
    ]

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: false,
    };


    return (
        <div className="categories">

            {selectedCategory && selectedSubCategory
                ?
                <div className="categories-title">
                    <div className="categories-title-back" onClick={() => setSelectedSubCategory(null)}>
                        <ArrowToBottom/>
                    </div>
                    <h3>
                        {selectedSubCategory?.title} <span>2 товаров</span>
                    </h3>
                </div>
                :
                selectedCategory
                    ?
                    <div className="categories-title">
                        {
                            selectedCategory?.subCategory &&
                            <div className="categories-title-back" onClick={() => setSelectedCategory(null)}>
                                <ArrowToBottom/>
                            </div>
                        }
                        <h3>
                            {selectedCategory?.title} <span>1 товаров</span>
                        </h3>
                    </div>
                    :
                    <h3>
                        Каталог поставщика <span>3 товаров</span>
                    </h3>
            }

            {
                selectedCategory?.subCategory
                    ?
                    <Slider {...settings}>
                        {selectedCategory?.subCategory?.map((category: any, index: any) => (
                            <div key={index} className={"category"}>
                                <div
                                    className="category-item"
                                    onClick={() => setSelectedSubCategory(category)}
                                    style={{
                                        color: category?.id === selectedSubCategory?.id
                                            ? 'rgba(255, 255, 255, 1)'
                                            : 'rgba(53, 53, 53, 1)',
                                        backgroundColor: category?.id === selectedSubCategory?.id
                                            ? 'rgba(75, 103, 233, 1)'
                                            : 'rgba(53, 53, 53, 0.1)',
                                    }}
                                >
                                    {category?.title}
                                </div>
                            </div>
                        ))}
                    </Slider>
                    :
                    <Slider {...settings}>
                        {categories.map((category: any, index: any) => (
                            <div key={index} className={"category"}>
                                <div
                                    className="category-item"
                                    onClick={() => setSelectedCategory(category)}
                                    style={{
                                        color: category?.id === selectedCategory?.id
                                            ? 'rgba(255, 255, 255, 1)'
                                            : 'rgba(53, 53, 53, 1)',
                                        backgroundColor: category?.id === selectedCategory?.id
                                            ? 'rgba(75, 103, 233, 1)'
                                            : 'rgba(53, 53, 53, 0.1)',
                                    }}
                                >
                                    {category?.title}
                                </div>
                            </div>
                        ))}
                    </Slider>
            }

        </div>
    );
};

export default Categories;