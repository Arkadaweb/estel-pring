import React, {useEffect, useState} from 'react';
import {AutoComplete, Button, Input} from 'antd';
import {useRouter} from "next/router";
import SearchIcon from "../../assets/icons/header/SearchIcon";
import type {SelectProps} from 'antd/es/select';
import {useDebounce} from "use-debounce";
import {api} from "../../api/request";


const MainSearch = ({...props}) => {

    const router = useRouter()
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const [searchValue, setSearchValue] = useState<string>('')
    const [debouncedSearch] = useDebounce(searchValue, 1000);

    const [searchArray, setSearchArray] = useState<any>([])

    const searchResult = (query: string) => {
        return searchArray
            ?.map((item: any, index: any) => {
                return {
                    value: item?.name,
                    label: (
                        <div>
                            {item?.name}
                        </div>
                    )
                }
            })
    }

    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (item: string) => {
        if (item) {
            router.push(`/search?search=${item}`)
        }
    };

    const onPressFind = (value: any) => {
        if (searchValue) {
            router.push(`/search?search=${searchValue}`)
        }
    };

    const dropdownRender = (menu: any) => (
        <div className="search-drop-down-block">
            {menu}
        </div>
    );

    useEffect(() => {
        api.get(`products`, {
            search: debouncedSearch,
        })
            .then((response) => {
                setSearchArray(response?.data)
            })
            .catch(() => {

            })
            .finally(() => {

            });
    }, [debouncedSearch])

    return (
        <AutoComplete
            // popupMatchSelectWidth={'90%'}
            style={{
                height: 53,
                width: '100%',
            }}
            dropdownRender={dropdownRender}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
        >
            <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e?.target?.value)}
                style={{
                    height: 53,
                    width: '100%',
                    borderRadius: 50,
                    paddingLeft: 20
                }}
                onPressEnter={onPressFind}
                size="large"
                placeholder="input here"
                suffix={
                    <div
                        onClick={onPressFind}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <SearchIcon/>
                    </div>
                }
                {...props}
            />
        </AutoComplete>
    );
};

export default MainSearch;