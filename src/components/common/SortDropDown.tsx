import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import SortIcon from "../../assets/icons/common/SortIcon";
// import ArrowToBottom from "../../assets/icons/common/ArrowToBottom";

const SortDropDown: FC<PropsWithChildren<any>> = ({
                                                      orderBy,
                                                      order,
                                                      changeSort = (sort: string, type: any) => {},
                                                  }) => {

    const [activeSort, setActiveSort] = useState<string>(`${orderBy}:${order}`);
    // const [activeSort, setActiveSort] = useState<string>(`price:asc`);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const sortRef = useRef<any>(null);

    const sortItems = [
        {
            title: 'Цена по возрастнию',
            type: 'price:asc'
        },
        {
            title: 'Цена по убыванию',
            type: 'price:desc'
        },
        {
            title: 'По популярности',
            type: 'popularity:asc'
        },
    ]

    const onSetSort = async (item: any) => {
        await setActiveSort(item?.type)
        await setIsOpen(false)
        await changeSort('sort', item.type)
    }

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

    useEffect(() => {
        setActiveSort(`${orderBy}:${order}`)
    }, [orderBy, order])

    return (
        <div className="sort" ref={sortRef}>
            <div
                className="sort-title"
                onClick={() => setIsOpen(!isOpen)}
            >
                <SortIcon/>
                <p>
                    Сортировка
                </p>

            </div>

            <div className={`sort-popup ${isOpen ? 'sort-popup-open' : ''}`}>
                {
                    sortItems.map((item: any) =>
                        <p
                            key={item.type}
                            onClick={() => onSetSort(item)}
                            style={{
                                color: item?.type !== activeSort ? 'rgba(37, 37, 37, 1)' : 'rgba(53, 134, 255, 1)'
                            }}
                        >
                            {item?.title}
                        </p>
                    )
                }
            </div>
        </div>
    );
};

export default SortDropDown;