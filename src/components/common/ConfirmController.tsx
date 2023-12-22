import React, {FC, PropsWithChildren, useContext, useEffect, useRef, useState} from 'react';
import CrossIcon from "../../assets/icons/auth/CrossIcon";
import {Checkbox, Form, Input, message} from "antd";
import ButtonCustom from "./ButtonCustom";
import Link from "next/link";
import {useRouter} from "next/router";

const Context = React.createContext<any>(null);

const useConfirm = () => {

    const {
        setState,
    } = useContext<any>(Context);

    return ({isVisible, onAdd}: any) => {
        setState({
            isOpen: isVisible,
            onAdd: onAdd
        })
    };
}

const ConfirmController: FC<PropsWithChildren<any>> = ({children}) => {

    const router = useRouter();

    const [state, setState] = useState<any>({
        isOpen: false,
        onAdd: () =>{}
    });

    console.log(state)


    const onPress = async () => {
        await state?.onAdd()
        await setState({
            isOpen: false,
            onAdd: () =>{}
        })
    }

    return (
        <Context.Provider value={{setState}}>
            <div className={`auth ${state?.isOpen ? 'auth-visible' : ''}`}>
                <div className="auth-wrapper confirm">
                    <button
                        className="auth-wrapper-close"
                        onClick={onPress}
                    >
                        <CrossIcon/>
                    </button>
                    <div className="auth-wrapper-form">
                        <h4>
                            Товар добавлен в корзину
                        </h4>
                        <p>
                            Хотите продолжить покупки или сразу перейти в корзину?
                        </p>
                        <div className="auth-wrapper-form-buttons">
                            <ButtonCustom
                                text='Продолжить покупки'
                                onPress={onPress}
                            />
                            <ButtonCustom
                                text='Перейти в корзину'
                                backgroundColor={'#fff'}
                                color={'#FF6A28'}
                                border={'#FF6A28'}
                                onPress={() => {
                                    onPress()
                                    router.push('/bucket')
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </Context.Provider>
    );
};

export {ConfirmController, useConfirm};