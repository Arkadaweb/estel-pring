import React, {FC, PropsWithChildren, useState} from 'react';
import {Checkbox} from "antd";
import ArrowToDown from "../../assets/icons/common/ArrowToDown";

const DropDownCheck: FC<PropsWithChildren<any>> = ({
                                                       item,
                                                   }) => {

    // const [isOpen, setIsOpen] = useState<boolean>(!!items?.find((item: any) => item?.isCheck))
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [isShowMore, setIsShowMore] = useState<boolean>(false)


    const renderItems = () => {

        const data: any = isShowMore ? item?.elements : item?.elements?.slice(0, 4)

        return (
            data?.map((item: any) =>
                <div className="drop-down-check-items-item check-boxes" key={item?.title}>
                    <p>
                        <Checkbox
                            style={{
                                backgroundColor: '#fff',
                            }}
                            // checked={item?.isCheck}
                            // onChange={() =>onChangeCheckBox(item?.id)}
                        />
                        {item?.title}
                    </p>
                </div>
            )
        )
    }
    return (
        <div className="drop-down-check">
            <div className="drop-down-check-title" onClick={() => setIsOpen(!isOpen)}>
                <h3>
                    {item?.title}
                </h3>
                <div className={`drop-down-check-svg ${isOpen ? 'drop-down-check-svg-rotate' : ''}`}>
                    <ArrowToDown/>
                </div>
            </div>

            <div className={`drop-down-check-items ${isOpen ? 'open-drop-check-down' : ''}`}>
                {
                    renderItems()
                }
                {
                    !isShowMore && item.elements?.length > 4 &&
                    <p onClick={() => setIsShowMore(true)}>
                        Показать все
                    </p>
                }

            </div>
        </div>
    );
};

export default DropDownCheck;