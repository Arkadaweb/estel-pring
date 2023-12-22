import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import Image from "next/dist/client/legacy/image";
import testIntroImage from '../../../../public/testIntroImage.png'
import Counter from "../../../components/common/Counter";
import DeleteIcon from "../../../assets/icons/bucket/DeleteIcon";
import {useAppDispatch} from "../../../store/store";

import {setOnClearById, setChangeCount} from '../../../store/slices/bucketSlice'

const BucketProductItem: FC<PropsWithChildren<any>> = ({
                                                           item
                                                       }) => {

    const dispatch = useAppDispatch()

    const [count, setCount] = useState<number>(item.count)

    const onClearById = () => {
        dispatch(setOnClearById(item?.id))
    }

    useEffect(() => {
        dispatch(setChangeCount({
            id: item?.id,
            count
        } as any))
    }, [count])

    return (
        <div className="bucket-product-item">
            <div className="bucket-product-item-img">
                <Image
                    layout={'fill'}
                    src={item?.image?.src}
                />
            </div>
            <div className="bucket-product-item-info">
                <div className="bucket-product-item-info-brand">
                    {item?.attributes?.find((item: any) => item?.name === 'Бренд')?.options?.join(', ')}
                </div>
                <div className="bucket-product-item-info-title">
                    {item?.name}
                </div>
                <div className="bucket-product-item-info-size">
                    2500*400*2300
                    {/*{item?.attributes?.find((item: any) => item?.name === 'Размер (Ш*Д*В) мм')?.options}*/}
                </div>
            </div>
            <div className="bucket-product-item-counter">
                <Counter
                    count={count}
                    setCount={setCount}
                />
            </div>
            <div className="bucket-product-item-price">
                от{' '}
                {
                    Number(count) * Number(item?.price)
                }
                {' '}₽
            </div>
            <div className="bucket-product-item-clear" onClick={onClearById}>
                <span>
                    <DeleteIcon/>
                </span>
            </div>
        </div>
    );
};

export default BucketProductItem;
