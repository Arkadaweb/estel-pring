import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import SortIcon from "../../assets/icons/common/SortIcon";
import FilterIcon from "../../assets/icons/common/FilterIcon";
import {Checkbox, Input, Slider} from "antd";
import MinusIcon from "../../assets/icons/common/MinusIcon";
import ButtonCustom from "./ButtonCustom";
import PlusIcon from "../../assets/icons/common/PlusIcon";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/router";

const FilterDropDown: FC<PropsWithChildren<any>> = ({
                                                        path,
                                                        sort = {},
                                                        brands = []
                                                    }) => {

    const searchParams = useSearchParams()
    const router = useRouter();

    const [mainFilter, setMainFilter] = useState(brands)

    const [value, setValue] = React.useState([sort?.min_price || 0, sort?.max_price || 5000]);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isPlus, setIsPlus] = useState(false);

    const sortRef = useRef<any>(null);

    useEffect(() => {
        const handleDocumentClick = (event: any) => {
            if (isOpen && sortRef.current && !sortRef?.current?.contains(event?.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [isOpen]);

    const onChangeCheckBox = (id: any) => {
        let map = mainFilter?.map((item: any) => item?.id === id ? ({...item, isCheck: !item?.isCheck}) : item)
        setMainFilter(map)
    }

    const onFilter = () => {

        const filters: any = {
            min_price: value[0],
            max_price: value[1],
            attribute: "pa_brand",
        }

        if (mainFilter?.find((item: any) => item?.isCheck)) {
            filters.attribute = "pa_brand"
            filters.attribute_term = mainFilter?.filter((item: any) => item?.isCheck)?.map((item: any) => item?.id)?.join(',')
        }

        let filterToSend: any = {
            page: 1,
            ...filters
        };

        if (searchParams.get('orderby')) {
            filterToSend.orderby = searchParams.get('orderby')
        }
        if (searchParams.get('order')) {
            filterToSend.order = searchParams.get('order')
        }
        if (searchParams.get('search')) {
            filterToSend.search = searchParams.get('search')
        }

        router.push({
            pathname: path || '/catalog',
            query: {
                ...filterToSend
            },
        })
    }

    const onClearFilter = () => {

        let filterToSend: any = {
            page: 1,
        };

        if (searchParams.get('orderby')) {
            filterToSend.orderby = searchParams.get('orderby')
        }
        if (searchParams.get('order')) {
            filterToSend.order = searchParams.get('order')
        }
        if (searchParams.get('search')) {
            filterToSend.search = searchParams.get('search')
        }

        let map1 = mainFilter?.map((item: any) => ({...item, isCheck: false}))

        setMainFilter(map1)
        setValue([100, 1000])

        router.push({
            pathname: path || '/catalog',
            query: {
                ...filterToSend
            },
        })
    }

    return (
        <div className="filter" ref={sortRef}>
            <div
                className="filter-title"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FilterIcon/>
                <p>
                    Фильтры
                </p>
                <div className="filter-title-count">
                    {
                        sort?.min_price && sort?.max_price && sort?.attribute_term
                            ? 2
                            : sort?.attribute_term || sort?.max_price
                            ? 1
                            : 0

                    }
                </div>
            </div>

            <div className={`filter-popup ${isOpen ? 'filter-popup-open' : ''}`}>
                <div className="filter-popup-title">
                    Цена
                </div>
                <Slider
                    min={0}
                    max={10000}
                    onChange={setValue}
                    value={value}
                    defaultValue={value}
                    range={{draggableTrack: true}}
                    // tooltip={{
                    //     open: isOpen ? true : false
                    // }}
                />
                <div className="filter-popup-inputs">
                    <Input
                        style={{
                            borderRadius: 50,
                            padding: '10px',
                        }}
                        type={'number'}
                        prefix={'От'}
                        suffix={'₽'}
                        value={value[0]}
                        onChange={(e) => setValue([Number(e?.target?.value), value[1]])}
                    />
                    <div className="filter-popup-inputs-line"/>
                    <Input
                        style={{
                            borderRadius: 50,
                            padding: '10px',
                        }}
                        prefix={'До'}
                        type={'number'}
                        suffix={'₽'}
                        value={value[1]}
                        onChange={(e) => setValue([value[0], Number(e?.target?.value)])}
                    />
                </div>
                <div className="filter-popup-line"/>
                <div className="filter-popup-title" onClick={() => setIsPlus(!isPlus)}>
                    Бренды

                    <span style={{
                        display: isPlus ? 'block' : 'none'
                    }}>
                        <MinusIcon/>
                    </span>

                    <span style={{
                        display: !isPlus ? 'block' : 'none'
                    }}>
                        <PlusIcon/>
                    </span>
                </div>

                <div className={`filter-popup-brands ${isPlus ? 'filter-popup-brands-open' : ''}`}>
                    {
                        mainFilter?.map((item: any) =>
                            <p key={item?.id}>
                                <Checkbox
                                    style={{
                                        backgroundColor: '#fff',
                                    }}
                                    checked={item?.isCheck}
                                    onChange={() => onChangeCheckBox(item?.id)}
                                />
                                {item?.name}
                            </p>
                        )
                    }
                </div>

                <div className="filter-popup-buttons">
                    <ButtonCustom
                        onPress={onFilter}
                        width={'100%'}
                        text={'Применить'}
                        padding={'10px auto'}
                    />
                    <ButtonCustom
                        onPress={onClearFilter}
                        width={'100%'}
                        text={'Сбросить'}
                        padding={'10px auto'}
                        color={'#fff'}
                        backgroundColor={'rgba(37, 37, 37, 1)'}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterDropDown;
