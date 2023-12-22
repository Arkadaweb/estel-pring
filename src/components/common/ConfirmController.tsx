import React, {FC, PropsWithChildren, useContext, useEffect, useRef, useState} from 'react';
import {Checkbox, Form, Input, message} from "antd";
import ButtonCustom from "./ButtonCustom";
import Link from "next/link";
import {useRouter} from "next/router";
import CrossIcon from "../../assets/icons/common/CrossIcon";
import LineIcon from "../../assets/icons/common/LineIcon";

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
            <div className={`confirm ${state?.isOpen ? 'confirm-visible' : ''}`}>
                <div className="confirm-wrapper">
                    <button
                        className="confirm-wrapper-close"
                        onClick={onPress}
                    >
                        <CrossIcon/>
                    </button>
                    <div className="confirm-wrapper-title">
                        <LineIcon/>
                        Товар добавлен в корзину
                    </div>
                    <div className="confirm-wrapper-buttons">
                        <ButtonCustom
                            width={'100%'}
                            padding={'15px 35px'}
                            text='Перейти в корзину'
                            onPress={() => {
                                onPress()
                                router.push('/bucket')
                            }}
                        />
                        <ButtonCustom
                            width={'100%'}
                            backgroundColor={'rgba(37, 37, 37, 1)'}
                            colro={'#fff'}
                            padding={'15px 35px'}
                            text='Продолжить покупки'
                            onPress={onPress}
                        />
                    </div>
                </div>
            </div>
            {children}
        </Context.Provider>
    );
};

export {ConfirmController, useConfirm};
