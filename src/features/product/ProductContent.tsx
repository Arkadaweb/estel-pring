import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import SliderCustom from "../../components/common/SliderCustom";
import Slider from "react-slick";

import testCategoryCardImg from "../../../public/testCategoryCardImg.png";
import ButtonCustom from "../../components/common/ButtonCustom";
import Counter from "../../components/common/Counter";
import Image from "next/dist/client/legacy/image";
import CircleArrow from "../../assets/icons/product/CircleArrow";
import ConsultationsFormSection from "../../sections/ConsultationsFormSection";
import {Select} from "antd";
import SelectorArrow from "../../assets/icons/product/SelectorArrow";
import MediaBlock from "./components/MediaBlock";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {setBucketProducts, setChangeCount} from "../../store/slices/bucketSlice";
import {useRouter} from "next/router";

const {Option} = Select;


const compareAttributes = (arr1: any, arr2: any) =>
    arr1.every((attr: any) => arr2.some((attr2: any) => attr.id === attr2.id && attr.option === attr2.option));

const ProductContent: FC<PropsWithChildren<any>> = ({
                                                        product,
                                                        variations,
                                                        commonProducts,
                                                        media,
                                                    }) => {

    const router = useRouter()


    const initVariantOptions = product.attributes?.map((item: any) => ({
        id: item?.id,
        name: item?.name,
        option: item?.options?.[0]
    }))

    const mainVariant = variations.find((item: any) => compareAttributes(item.attributes, initVariantOptions));


    const [mainImage, setMainImage] = useState(mainVariant?.image?.src || product?.images?.[0]?.src || null)
    const [selectedType, setSelectedType] = useState(initVariantOptions || [])

    const selectedProduct = variations.find((item: any)  => compareAttributes(item.attributes, selectedType)) || product

    const {products} = useAppSelector((state: any) => state.bucket)
    const dispatch = useAppDispatch()
    const isHasInBucket = products?.find((prodItem: any) => prodItem?.id == selectedProduct?.id)

    const onAddToBucket = () => {
        dispatch(setBucketProducts(selectedProduct))
    }

    const [count, setCount] = useState<number | undefined>(products?.find((prodItem: any) => prodItem?.id == selectedProduct?.id)?.count)

    useEffect(() => {
        if (count !== 0) {
            dispatch(setChangeCount({
                id: selectedProduct?.id || product?.id,
                count
            } as any))
        }
    }, [count])

    useEffect(() => {
        if (count !== 0) {
            setCount(isHasInBucket?.count)
        }
    }, [isHasInBucket])


    const breadCrumbs = [
        {
            id: 1,
            path: '/',
            title: 'Главная'
        },
        {
            id: 2,
            path: '/catalog',
            title: 'Каталог продукции'
        },
        {
            id: 3,
            path: `/catalog/${product?.categories?.[0]?.slug}`,
            title: product?.categories?.[0]?.name
        },
    ]

    const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

    let slider: any;

    const settings = {
        dots: false,
        infinite: false,
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: 3,
                },
            },
        ],
    };

    const goToNext = () => {
        slider.slickNext();
    };

    const goToPrev = () => {
        slider.slickPrev();
    };

    const handleBeforeChange = (oldIndex: any, newIndex: any) => {
        setIsPrevButtonDisabled(newIndex === 0);
        setIsNextButtonDisabled(newIndex === slider?.props?.children?.length - 4);
    };

    const onChangeSelectType = (option: any, name: any) =>{

        const updatedTypes = selectedType.map((type: any) => {
            if (type.name === name) {
                return {
                    ...type,
                    option: option
                };
            } else {
                return type;
            }
        });

        setSelectedType(updatedTypes);
    }

    useEffect(() => {
        const currentVariant = variations.find((item: any)  => compareAttributes(item.attributes, selectedType));
        setMainImage(currentVariant?.image?.src || product?.images?.[0]?.src)
    }, [selectedType, product])

    return (
        <>
            <MaxWithLayout>
                <div className="product-content">
                    <BreadCrumbs elements={breadCrumbs}/>

                    <div className="product-content-main">
                        <div className="product-content-main-slider">
                            {
                                product?.images?.length > 4 &&
                                <button
                                    className={`product-content-main-slider-top ${isPrevButtonDisabled ? 'disabled' : ''}`}
                                    onClick={goToPrev}
                                    disabled={isPrevButtonDisabled}
                                >
                                    <CircleArrow/>
                                </button>
                            }

                            <Slider ref={(c) => (slider = c)} {...settings} beforeChange={handleBeforeChange}>
                                {product?.images?.map((image: any, index: any) => (
                                    <div
                                        key={index}
                                        className="product-content-main-slider-img"
                                        onClick={() => setMainImage(image?.src)}
                                    >
                                        <Image
                                            src={image?.src}
                                            alt={image?.alt}
                                            title={image?.name}
                                            layout={'fill'}
                                        />
                                    </div>
                                ))}
                            </Slider>
                            {
                                product?.images?.length > 4 &&
                                <button
                                    className={`product-content-main-slider-bottom ${isNextButtonDisabled ? 'disabled' : ''}`}
                                    onClick={goToNext}
                                    disabled={isNextButtonDisabled}
                                >
                                    <CircleArrow/>
                                </button>
                            }
                        </div>
                        <div className="product-content-main-photo">
                            <Image
                                src={mainImage}
                                layout={'fill'}
                            />
                        </div>
                        <div className="product-content-main-info">
                            <div className="product-content-main-info-top">
                                <h4>
                                    {product?.categories?.[0]?.name}
                                </h4>
                                <h5>
                                    Арт.: {product?.sku}
                                </h5>
                            </div>
                            <div className="product-content-main-info-title">
                                {product?.name || '---'}
                            </div>

                            {/*{product?.attributes?.find((item: any) => item?.id === 4) &&*/}
                            {/*<div className="product-content-main-info-selector">*/}
                            {/*    <h6>*/}
                            {/*        Размер (Ш*Д*В) мм*/}
                            {/*    </h6>*/}
                            {/*    <Select*/}
                            {/*        value={selectedType}*/}
                            {/*        onChange={(e) => setSelectedType(e)}*/}
                            {/*        suffixIcon={<SelectorArrow/>}*/}
                            {/*        defaultValue={product?.attributes?.find((item: any) => item?.id === 4)?.options?.[0]}*/}
                            {/*        style={{*/}
                            {/*            width: 200*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        {product?.attributes?.find((item: any) => item?.id === 4)?.options?.map((option: any) => {*/}
                            {/*            return (*/}
                            {/*                <Option key={option} value={option}>*/}
                            {/*                    {option}*/}
                            {/*                </Option>*/}
                            {/*            );*/}
                            {/*        })}*/}
                            {/*    </Select>*/}

                            {/*</div>*/}
                            {/*}*/}

                            {product?.attributes?.lenght !== 0 &&
                            product?.attributes?.map((item: any) =>
                                <div className="product-content-main-info-selector">
                                    <h6>
                                        {item?.name}
                                    </h6>
                                    <Select
                                        value={item.option}
                                        onChange={(e) => onChangeSelectType(e, item?.name)}
                                        suffixIcon={<SelectorArrow/>}
                                        defaultValue={item?.options[0]}
                                        style={{
                                            width: '50%'
                                        }}
                                    >
                                        {
                                            item?.options?.map((itemOpt: any) =>
                                                <Option key={itemOpt} value={itemOpt}>
                                                    {itemOpt}
                                                </Option>
                                            )
                                        }
                                    </Select>

                                </div>
                            )}

                            <div
                                className="product-content-main-info-price"
                            >
                                {' '}
                                {
                                    isHasInBucket?.count
                                        ? Number(isHasInBucket?.count) * Number(selectedProduct?.price)
                                        : selectedProduct?.price

                                }
                                {' '} ₽
                            </div>

                            <div className="product-content-main-info-count">
                                <div className="product-content-main-info-count-button">
                                    {
                                        isHasInBucket
                                            ?
                                            <ButtonCustom
                                                text={"Перейти в корзину"}
                                                backgroundColor={'#26c423'}
                                                onPress={() => router.push('/bucket')}
                                            />
                                            :
                                            <ButtonCustom
                                                onPress={onAddToBucket}
                                                text='Добавить в корзину'
                                                fontSize={18}
                                                borderRadius={50}
                                                padding={"15px 35px"}
                                            />
                                    }
                                </div>
                                {isHasInBucket?.count &&
                                <div className="product-content-main-info-count-count">
                                    <Counter
                                        count={count}
                                        setCount={setCount}
                                    />
                                </div>
                                }

                            </div>
                        </div>
                    </div>

                    <div className="product-content-desc">
                        <h4>
                            Описание
                        </h4>
                        <p dangerouslySetInnerHTML={{__html: product?.description || ''}}/>
                    </div>


                    {media && media?.length > 0 &&
                    <div className="product-content-media">
                        <div className="product-content-media-title">
                            Блок для доп. фото и видео
                        </div>
                        <div className="product-content-media-items">
                            {
                                media?.map((item: any) =>
                                    <MediaBlock
                                        url={item?.url}
                                        type={item?.type}
                                        preview={item?.preview}
                                    />
                                )
                            }
                        </div>
                    </div>
                    }

                    {
                        commonProducts?.length > 0 &&
                        <div className="product-content-common">
                            <SliderCustom
                                elements={commonProducts}
                            />
                        </div>
                    }

                </div>
            </MaxWithLayout>
            <ConsultationsFormSection/>
        </>
    );
};

export default ProductContent;
