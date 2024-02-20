import React, {FC, PropsWithChildren} from 'react';
import Image from "next/dist/client/legacy/image";
import ButtonCustom from "./ButtonCustom";
import Link from "next/link";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {useConfirm} from "./ConfirmController";
import {setBucketProducts} from '../../store/slices/bucketSlice'

const ProductItem: FC<PropsWithChildren<any>> = ({
                                                     item,
                                                     path
                                                 }) => {

    const {products} = useAppSelector((state: any) => state.bucket)
    const dispatch = useAppDispatch()
    const confirm = useConfirm()
    const router = useRouter()

    const isHasInBucket: number | undefined = products?.find((prodItem: any) => prodItem?.id == item?.id)?.count

    const onAddToBucket = (product: any) => {
        if (products?.length === 0) {
            confirm({
                isVisible: true,
                onAdd: () => dispatch(setBucketProducts(product))
            })
        } else {
            dispatch(setBucketProducts(product))
        }
    }

    let imageSrc;

    try {
        imageSrc = item?.images[0]?.src
    } catch (e) {

    }

    const renderUrl = () => {
        if (item?.categories?.[0]?.slug) {
            return `/catalog/${item?.categories?.[0]?.slug}/${item?.slug}`
        } else {
            return `/catalog/${item?.slug}`
        }
    }

    return (
        <div className="product-item">
            <Link href={renderUrl()} className="product-item-img">
                <Image
                    layout={'fill'}
                    src={imageSrc}
                />
            </Link>
            <div className="product-item-text">
                {item?.name}
            </div>
            <div className="product-item-bottom">
                <div
                    className="product-item-bottom-price"
                >
                   {item?.price} ₽
                </div>
                <div className="product-item-bottom-button">

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
                                onPress={() => onAddToBucket(item)}
                                text={'В корзину'}
                            />
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
