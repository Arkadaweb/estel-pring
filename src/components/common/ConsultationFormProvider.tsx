import React, {FC, PropsWithChildren, useContext, useEffect, useRef, useState} from 'react';
import CrossIcon from "../../assets/icons/auth/CrossIcon";
import {Checkbox, Form, Input, message} from "antd";
import ButtonCustom from "./ButtonCustom";
import Link from "next/link";

const Context = React.createContext<any>(null);

const useAuth = () => {

    const {
        setIsVisible
    } = useContext<any>(Context);

    return (isVisible: any) => {
        setIsVisible(isVisible)
    };
}

const AuthController: FC<PropsWithChildren<any>> = ({children}) => {

    const [isVisible, setIsVisible] = useState<any>(false);

    const onClose = () =>{
        setIsVisible(false)
        setState('login')
    }

    //login, singUp, resetPass
    const [state, setState] = useState('login')

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        form.resetFields()
        message.success('success')
    }

    const renderLogin = () => {
        return (
            <div className="auth-wrapper">
                <button
                    className="auth-wrapper-close"
                    onClick={onClose}
                >
                    <CrossIcon/>
                </button>
                <div className="auth-wrapper-title">
                    Вход
                </div>
                <div className="auth-wrapper-form">
                    <Form
                        onFinish={onFinish}
                        layout={"vertical"}
                        form={form}
                    >
                        <Form.Item
                            name="main"
                            rules={[
                                {
                                    required: true,
                                    message: "Пожалуйста, введите почту",
                                },
                            ]}
                        >
                            <Input
                                placeholder={'E-mail'}
                                style={{
                                    height: 47
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Пожалуйста, введите пароль",
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder={'Пароль'}
                                style={{
                                    height: 47
                                }}
                            />
                        </Form.Item>

                        <div className="auth-wrapper-form-remember">
                            <div className="auth-wrapper-form-remember-remember">
                                <Checkbox
                                    style={{backgroundColor: '#fff'}}
                                />
                                <p>
                                    Запомнить меня
                                </p>
                            </div>
                            <div
                                className="auth-wrapper-form-remember-forgot"
                                onClick={() => setState('resetPass')}
                            >
                                Забыли пароль?
                            </div>
                        </div>

                        <div className="auth-wrapper-form-button">
                            <ButtonCustom
                                width={'100%'}
                                text={'Войти'}
                            />
                            <ButtonCustom
                                padding={'11px 35px'}
                                width={'100%'}
                                text={'Зарегистрироваться'}
                                backgroundColor={'transparent'}
                                color={'rgba(44, 44, 44, 1)'}
                                fontSize={16}
                                onPress={() => setState('singUp')}
                            />
                        </div>
                    </Form>
                </div>
            </div>
        )
    }

    const renderSingUp = () => {
        return (
            <div className="auth-wrapper">
                <button
                    className="auth-wrapper-close"
                    onClick={onClose}
                >
                    <CrossIcon/>
                </button>
                <div className="auth-wrapper-title">
                    Регистрация
                </div>
                <div className="auth-wrapper-form">
                    <Form
                        onFinish={onFinish}
                        layout={"vertical"}
                        form={form}
                    >
                        <Form.Item
                            name="main"
                            rules={[
                                {
                                    required: true,
                                    message: "Пожалуйста, введите почту",
                                },
                            ]}
                        >
                            <Input
                                placeholder={'Введите e-mail'}
                                style={{
                                    height: 47
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Пожалуйста, введите пароль",
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder={'Введите пароль'}
                                style={{
                                    height: 47
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password-2"
                            rules={[
                                {
                                    required: true,
                                    message: "Пожалуйста, введите пароль",
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder={'Повторите пароль'}
                                style={{
                                    height: 47
                                }}
                            />
                        </Form.Item>

                        <div className="auth-wrapper-form-remember">
                            <div className="auth-wrapper-form-remember-remember">
                                <Checkbox
                                    style={{backgroundColor: '#fff'}}
                                />
                                <p>
                                    Запомнить меня
                                </p>
                            </div>
                        </div>

                        <div className="auth-wrapper-form-button">
                            <ButtonCustom
                                width={'100%'}
                                text={'Зарегистрироваться'}
                            />
                            <ButtonCustom
                                padding={'11px 35px'}
                                width={'100%'}
                                text={'Войти'}
                                backgroundColor={'transparent'}
                                color={'rgba(44, 44, 44, 1)'}
                                fontSize={16}
                                onPress={() => setState('login')}
                            />
                        </div>
                    </Form>
                </div>
            </div>
        )
    }

    const renderResetPass = () => {
        return (
            <div className="auth-wrapper">
                <button
                    className="auth-wrapper-close"
                    onClick={onClose}
                >
                    <CrossIcon/>
                </button>
                <div className="auth-wrapper-title">
                    Восстановление пароля
                </div>
                <div className="auth-wrapper-form">
                    <Form
                        onFinish={onFinish}
                        layout={"vertical"}
                        form={form}
                    >
                        <Form.Item
                            name="main"
                            rules={[
                                {
                                    required: true,
                                    message: "Пожалуйста, введите почту",
                                },
                            ]}
                        >
                            <Input
                                placeholder={'Введите e-mail'}
                                style={{
                                    height: 47
                                }}
                            />
                        </Form.Item>

                        <div className="auth-wrapper-form-help">
                            Введите свой e-mail, мы отправим на него ссылку для восстановления пароля
                        </div>

                        <div className="auth-wrapper-form-button">
                            <ButtonCustom
                                width={'100%'}
                                text={'Восстановить пароль'}
                            />
                        </div>
                    </Form>
                </div>
            </div>
        )
    }

    return (
        <Context.Provider value={{setIsVisible}}>
            <div className={`auth ${isVisible ? 'auth-visible' : ''}`}>
                {
                    state === 'login' && renderLogin()
                }
                {
                    state === 'singUp' && renderSingUp()
                }
                {
                    state === 'resetPass' && renderResetPass()
                }
            </div>
            {children}
        </Context.Provider>
    );
};

export {AuthController, useAuth};