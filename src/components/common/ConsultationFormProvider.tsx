import React, {FC, PropsWithChildren, useContext, useEffect, useRef, useState} from 'react';
import CrossIcon from "../../assets/icons/common/CrossIcon";
import {Checkbox, Form, Input, message} from "antd";
import ButtonCustom from "./ButtonCustom";
import InputMask from "react-input-mask";
import {post} from "../../api/request";

const Context = React.createContext<any>(null);

const useConsultation = () => {

    const {
        setIsVisible
    } = useContext<any>(Context);

    return (isVisible: any) => {
        setIsVisible(isVisible)
    };
}

const ConsultationFormProvider: FC<PropsWithChildren<any>> = ({children}) => {

    const [isVisible, setIsVisible] = useState<any>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onClose = () => {
        setIsVisible(false)
    }

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
        <Context.Provider value={{setIsVisible}}>
            <div className={`consultation ${isVisible ? 'consultation-visible' : ''}`}>
                <div className="consultation-wrapper">
                    <button
                        className="consultation-wrapper-close"
                        onClick={onClose}
                    >
                        <CrossIcon/>
                    </button>
                    <div className="consultation-wrapper-title">
                        бесплатная консультация
                    </div>
                    <div className="consultation-wrapper-desc">
                        Оставьте заявку, и мы перезвоним вам!
                    </div>
                    <div className="consultation-wrapper-form">
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
            </div>
            {children}
        </Context.Provider>
    );
};

export {ConsultationFormProvider, useConsultation};