import React, {ReactNode, useState} from 'react';
import {Form, Input, message} from "antd";
import InputMask, {Props} from "react-input-mask";
import MaxWithLayout from "../layouts/MaxWithLayout";
import ButtonCustom from "../components/common/ButtonCustom";
import {post} from "../api/request";

const ConsultationsFormSection = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        setIsLoading(true)

        post('wp-json/wp/v3/mail', {
            name: values?.name,
            phone: values?.phone
        })
            .then((response: any) => {
                message.success('Форма успешно отправлена')
                form.resetFields()
            })
            .catch((e: any) => {
                message.error("Произошла ошибка при отправке формы")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }


    return (
        <MaxWithLayout>
            <div className="consultation-form">

                <div className="consultation-form-text">
                    <h4>
                        бесплатная
                        консультация
                    </h4>
                    <p>
                        Оставьте заявку, и мы перезвоним вам!
                    </p>
                </div>

                <div className="consultation-form-form">
                    <Form
                        form={form}
                        layout={"vertical"}
                        onFinish={onFinish}
                    >
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
                                placeholder={'Ваше имя'}
                                style={{
                                    height: 47
                                }}
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
                        <div className="consultation-form-form-bottom">
                            <div className="consultation-form-form-bottom-text">
                                Отправляя форму, вы соглашаетесь
                                с политикой конфиденциальности.
                            </div>
                            <div className="consultation-form-form-bottom-button">
                                <ButtonCustom
                                    isLoading={isLoading}
                                    width={'100%'}
                                    text={'Отправить'}
                                    padding={"18px 0"}
                                    borderRadius={'50px'}
                                />
                            </div>
                        </div>

                    </Form>
                </div>
            </div>
        </MaxWithLayout>
    );
};

export default ConsultationsFormSection;