import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import ArrowToBottom from "../../assets/icons/common/ArrowToBottom";

const SortDropDown: FC<PropsWithChildren<any>> = ({
                                                      orderBy,
                                                      order,
                                                      changeSort = (sort: string, type: any) => {},
                                                  }) => {

    // const [activeSort, setActiveSort] = useState<string>(`${orderBy}:${order}`);
    const [activeSort, setActiveSort] = useState<string>(`price:asc`);

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
        // {
        //     title: 'По скидкам',
        //     type: ''
        // },
        {
            title: 'По популярности',
            type: 'popularity:asc'
        },
        {
            title: 'По новизне',
            type: 'date:asc'
        },
    ]

    const onSetSort = async (item: any) => {
        await setActiveSort(item?.type)
        await setIsOpen(false)
        // await changeSort('sort', item.type)
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

    // useEffect(() => {
    //     setActiveSort(`${orderBy}:${order}`)
    // }, [orderBy, order])

    return (
        <div className="sort" ref={sortRef}>
            <div
                className="sort-title"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    border: isOpen ? '1px solid rgba(75, 103, 233, 1)' : "none"
                }}
            >
                <p>
                    {sortItems.find((item: any) => item.type === activeSort)?.title}
                </p>
                <span className={`${isOpen ? 'rotate-icon' : ''}`}>
                    <ArrowToBottom/>
                </span>
            </div>

            <div className={`sort-popup ${isOpen ? 'sort-popup-open' : ''}`}>
                {
                    sortItems.map((item: any) =>
                        <p
                            key={item.type}
                            onClick={() => onSetSort(item)}
                            style={{
                                backgroundColor: item?.type !== activeSort ? 'transparent' : 'rgba(75, 103, 233, 0.1)'
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