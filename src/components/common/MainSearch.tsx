import React, {useState} from 'react';
import {AutoComplete, Button, Input} from 'antd';
import type {SelectProps} from 'antd/es/select';
import textImage from '../../../public/testImageForSearch.png'
import Image from "next/dist/client/legacy/image";
import Link from "next/link";
import {useRouter} from "next/router";

const someArray = [
    {
        img: textImage,
        count: 200,
        label: 'Название поставщика',
        value: 'Название поставщика',
    },
    {
        img: textImage,
        count: 200,
        label: 'Name',
        value: 'Name',
    },
]
const searchResult = (query: string) => {

    return someArray
        ?.filter((item: any) => item?.label.toLowerCase().includes(query.toLowerCase()))
        ?.map((item: any, index: any) =>{

            return{
                value: item?.value,
                label: (
                    <div className='search-drop-down'>
                        <Image src={item?.img} width={36} height={36}/>
                        <div className="search-drop-down-text">
                            <h1>
                                {item?.label}
                            </h1>
                            <p>
                                {item?.count} товаров
                            </p>
                        </div>
                    </div>
                )
            }
        })

}

const MainSearch = ({...props}) => {

    const router = useRouter()
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);

    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value: string) => {
        // console.log('onSelect', value);
        if (value){
            router.push(`/complex/sadovod/provider`)
        }
    };

    const onPressFind = (value: string) => {
        if (value){
            router.push(`/search?search=${value}`)
        }
    };

    const dropdownRender = (menu: any) => (
        <div>
            {menu}
            <div className="search-drop-down-show-more">
                <div className="search-drop-down-show-more-line">

                </div>
                <Link href={'/search?search=${value}'}>
                    Показать все результаты
                </Link>
            </div>
        </div>
    );

    return (
        <AutoComplete
            // popupMatchSelectWidth={'90%'}
            style={{
                height: '100%',
                width: '100%',
            }}
            dropdownRender={dropdownRender}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
        >
            <Input.Search
                style={{
                    height: '100%',
                    width: '100%',
                }}
                size="large"
                placeholder="input here"
                enterButton
                onSearch={onPressFind}
                {...props}
            />
        </AutoComplete>
    );
};

export default MainSearch;