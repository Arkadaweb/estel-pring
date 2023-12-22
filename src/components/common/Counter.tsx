import React, {FC, PropsWithChildren, useState} from 'react';
import CounterMinus from "../../assets/icons/counter/CounterMinus";
import CounterPlus from "../../assets/icons/counter/CounterPlus";

const Counter: FC<PropsWithChildren<any>> = ({
                                                 width = '100%',
                                                 fontSize = '18px',
                                                 count = 1,
                                                 setCount = () =>{}
                                             }) => {

    // const [count, setCount] = useState<number>(1);

    const onPlus = () => {
        if (
            Number(count) < 0 ||
            Number(count) > 100 ||
            Number(count) === 0
        ) {
            return
        }
        setCount((prev: any) => prev + 1)
    }

    const onMinus = () => {
        if (
            Number(count) < 0 ||
            Number(count) > 100 ||
            Number(count) === 0 ||
            Number(count) === 1
        ) {
            return
        }
        setCount((prev: any) => prev - 1)
    }

    const onChangeCount = (e: any) => {
        if (
            Number(e.target.value) < 0 ||
            Number(e.target.value) > 100 ||
            Number(e.target.value) === 0
        ) {
            return
        }

        setCount(Number(e.target.value))
    }

    return (
        <div className="counter" style={{width}}>
            <div
                className="counter-item"
                onClick={onMinus}
            >
                <CounterMinus/>
            </div>
            <input
                style={{
                    fontSize
                }}
                type="number"
                value={count}
                onChange={onChangeCount}
            />
            <div
                className="counter-item"
                onClick={onPlus}
            >
                <CounterPlus/>
            </div>
        </div>
    );
};

export default Counter;
