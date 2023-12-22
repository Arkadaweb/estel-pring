import React, {useState} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import {useRouter} from "next/router";
import {Form, Input, message} from "antd";
import InputMask from "react-input-mask";
import ButtonCustom from "../../components/common/ButtonCustom";
import SelectedCheckIcon from "../../assets/icons/bucket/SelectedCheckIcon";
import UnselectedCheckIcon from "../../assets/icons/bucket/UnselectedCheckIcon";
import ArrowToBottom from "../../assets/icons/common/ArrowToBottom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {api} from "../../api/request";
import {setOnClearBucket, setPayment} from '../../store/slices/bucketSlice'

const OrderContent = () => {

    const router = useRouter();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()

    const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);

    const [selectedType, setSelectedType] = useState(1);

    const {products} = useAppSelector(state => state.bucket)

    const finalPrice = products.reduce((accumulator: any, product: any) => {
        const productTotal = Number(product?.price) * Number(product?.count);
        return accumulator + productTotal;
    }, 0);

    const breadCrumbs = [
        {
            id: 1,
            path: '/',
            title: 'Главная'
        },
        {
            id: 2,
            path: '/bucket',
            title: 'Корзина'
        },
        {
            id: 3,
            path: '',
            title: 'Оформление заказа'
        }
    ]

    const onSend = () => {
        form.submit()
    }

    const onFinish = (values: any) => {

        setIsLoadingForm(true)
        const body = {
            payment_method: 'bacs',
            payment_method_title: 'Bank Transfer',
            set_paid: true,
            billing: {
                first_name: values?.name,
                last_name: values?.surname,
                address_1: values?.address,
                city: values?.city,
                email: values?.email,
                phone: values?.phone,
            },
            line_items: {
                ...products?.map((item: any) => ({
                    product_id: item?.id,
                    quantity: item?.count
                }))
            }
        }

        api.post('orders', body)
            .then((response) =>{
                dispatch(setOnClearBucket())
                dispatch(setPayment(response?.data))
                router.push('/bucket/finish')
            })
            .catch((e) =>{
                message.error('Произошла ошибка при попытке отправить данные')
            })
            .finally(() =>{
                setIsLoadingForm(false)
            })

    }

    return (
        <MaxWithLayout>
            <div className="order-content">
                <BreadCrumbs elements={breadCrumbs}/>
                <h1>
                    Оформление заказа
                </h1>

                <div className="order-content-main">
                    <div className="order-content-main-form">
                        <Form
                            layout={"vertical"}
                            form={form}
                            onFinish={onFinish}
                        >
                            <h2>
                                Данные покупателя
                            </h2>
                            <div className="order-content-main-form-container">
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Данные введены неверно",
                                        },
                                    ]}
                                >
                                    <Input
                                        bordered={false}
                                        placeholder={'Имя'}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="surname"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Данные введены неверно",
                                        },
                                    ]}
                                >
                                    <Input
                                        bordered={false}
                                        placeholder={'Фамилия'}

                                    />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    rules={[
                                        {
                                            validator: (_, value) => {
                                                return value.length === 18 ? Promise.resolve() : Promise.reject('Данные введены неверно ');
                                            },
                                        },
                                    ]}
                                >
                                    <InputMask
                                        mask="+7 (999) 999-99-99"
                                        maskChar=""
                                        placeholder='Ваш телефон'
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                        }}
                                    >
                                        {((inputProps: any) => {
                                            return <Input
                                                {...inputProps}
                                                type="tel"
                                                disableUnderline
                                            />
                                        }) as any}
                                    </InputMask>
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Данные введены неверно',
                                        },
                                    ]}
                                >
                                    <Input
                                        bordered={false}
                                        placeholder={'E-mail'}
                                        rootClassName='star'
                                    />
                                </Form.Item>
                                {selectedType === 0 &&
                                    <>
                                        <Form.Item
                                            name="city"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Данные введены неверно",
                                                },
                                            ]}
                                        >
                                            <Input
                                                bordered={false}
                                                placeholder={'Город'}

                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Данные введены неверно",
                                                },
                                            ]}
                                        >
                                            <Input
                                                bordered={false}
                                                placeholder={'Адрес'}

                                            />
                                        </Form.Item>
                                    </>
                                }

                            </div>
                            <div className="order-content-main-form-select">
                                <h2>
                                    Данные покупателя
                                </h2>
                                <div
                                    className="order-content-main-form-select-item"
                                    onClick={() => setSelectedType(0)}
                                    style={{
                                        backgroundColor: selectedType === 0
                                            ? 'rgba(244, 244, 244, 1)'
                                            : 'rgba(255, 255, 255, 1)',
                                        border: selectedType === 0
                                            ? 'none' : '1px solid rgba(37, 37, 37, 0.2)'
                                    }}
                                >
                                    <div className="order-content-main-form-select-item-button">
                                        {
                                            selectedType === 0
                                                ? <SelectedCheckIcon/>
                                                : <UnselectedCheckIcon/>
                                        }
                                    </div>
                                    <div className="order-content-main-form-select-item-info">
                                        <h4>
                                            Курьерская доставка
                                        </h4>
                                        <h5>
                                            500 ₽
                                        </h5>
                                        <p>
                                            СДЭК, Деловые линии
                                        </p>
                                        <p>
                                            Срок доставки от 2 дней (не считая дня отправки)
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="order-content-main-form-select-item"
                                    onClick={() => setSelectedType(1)}
                                    style={{
                                        backgroundColor: selectedType === 1
                                            ? 'rgba(244, 244, 244, 1)'
                                            : 'rgba(255, 255, 255, 1)',
                                        border: selectedType === 1
                                        ? 'none' : '1px solid rgba(37, 37, 37, 0.2)'
                                    }}
                                >
                                    <div className="order-content-main-form-select-item-button">
                                        {
                                            selectedType === 1
                                                ? <SelectedCheckIcon/>
                                                : <UnselectedCheckIcon/>
                                        }
                                    </div>
                                    <div className="order-content-main-form-select-item-info">
                                        <h4>
                                            Самовывоз из мастерской
                                        </h4>
                                        <h5>
                                            бесплатно
                                        </h5>
                                        <p>
                                            г. Москва, м. Ленинский проспект, 5-й Донской пр., д. 15, стр. 2,офис 009
                                        </p>
                                        <p>
                                            Пн-Пт: 10:00-18:00
                                        </p>
                                        <p>
                                            +7 (969) 967-98-52
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Form.Item
                                name="comment"
                            >
                                <Input
                                    style={{marginTop: 60}}
                                    bordered={false}
                                    placeholder={'Комментарий'}

                                />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="order-content-main-info">
                        <h4>
                            Итого
                        </h4>
                        <div className="order-content-main-info-block">
                            <h6>
                                {products?.length} товара на сумму
                            </h6>
                            <p>
                                {finalPrice || 0 } ₽
                            </p>
                        </div>
                        <div className="order-content-main-info-block">
                            <h6>
                                Доставка
                            </h6>
                            <p>
                                бесплатно
                            </p>
                        </div>
                        <div className="order-content-main-info-final">
                            <h6>
                                Общая стоимость:
                            </h6>
                            <p>
                                {finalPrice || 0 } ₽
                            </p>
                        </div>

                        <div className="order-content-main-info-button">
                            <ButtonCustom
                                isLoading={isLoadingForm}
                                padding={'15px 10px'}
                                width={'100%'}
                                onPress={onSend}
                                text={'Оформить заказ'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MaxWithLayout>
    );
};

export default OrderContent;
