import React, {useEffect, useState} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import BucketProductItem from "./components/BucketProductItem";
import ButtonCustom from "../../components/common/ButtonCustom";
import ClearBucket from "../../assets/icons/bucket/ClearBucket";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {setOnClearBucket, setGroup} from '../../store/slices/bucketSlice'
import {api} from "../../api/request";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

const BucketContent = () => {

    const {products} = useAppSelector(state => state.bucket)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<any>(true)

    const finalPrice = products.reduce((accumulator: any, product: any) => {
        const productTotal = Number(product?.price) * Number(product?.count);
        return accumulator + productTotal;
    }, 0);


    const onClearBucket = () => {
        dispatch(setOnClearBucket())
    }


    const breadCrumbs = [
        {
            id: 1,
            path: '/',
            title: 'Главная'
        },
        {
            id: 2,
            path: '',
            title: 'Корзина'
        }
    ]

    const getProductsById = async () => {
        setIsLoading(true)
        try {
            let map = await products?.map(async (item: any, index: any) => {
                let {data} = await api.get(`products/${item?.id}`);

                return {
                    ...item,
                    image: data?.images?.[0],
                    name: data?.name?.split(' - ')?.[0]
                }
            });
            const allTerms: any = await Promise.all(map);
            dispatch(setGroup(allTerms))
        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getProductsById()
    }, [])

    return (
        <MaxWithLayout>
            <div className="bucket-content">
                <BreadCrumbs elements={breadCrumbs}/>

                {isLoading
                    ?
                    <div
                        style={{
                            padding: "150px",
                            textAlign: "center",
                        }}
                    >
                        <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{
                                        fontSize: 56,
                                        color: 'rgba(53, 134, 255, 1)'
                                    }}
                                />
                            }
                        />
                    </div>
                    :
                    products?.length !== 0
                        ?
                        <>
                            <div className="bucket-content-top">
                                <div className="bucket-content-top-title">
                                    Корзина <span>({products?.length} товара)</span>
                                </div>
                                <div className="bucket-content-top-clear" onClick={onClearBucket}>
                                    <ClearBucket/>
                                    Очистить корзину
                                </div>
                            </div>

                            <div className="bucket-content-items">
                                {
                                    products?.map((item: any) =>
                                        <BucketProductItem item={item}/>
                                    )
                                }
                            </div>

                            <div className="bucket-content-bottom">
                                <h5>
                                    Итого: <span> {finalPrice || 0} ₽</span>
                                </h5>
                                <ButtonCustom
                                    text={'Перейти к оформлению'}
                                    onPress={() => router.push('/bucket/order')}
                                />
                            </div>
                        </>
                        :
                        <div className="bucket-empty">
                            <h4>
                                Ваша корзина пуста
                            </h4>
                            <p>
                                Выберите в каталоге нужный товар и нажмите “добавить в корзину”
                            </p>
                            <ButtonCustom
                                text={'Перейти в каталог'}
                                padding={'18px 30px'}
                                onPress={() => router.push('/catalog')}
                            />
                        </div>
                }

            </div>

        </MaxWithLayout>
    );
};

export default BucketContent;
