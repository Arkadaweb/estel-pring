import React, {FC} from 'react';
import {Pagination, PaginationProps} from "antd";
import ArrowToRight from "../../assets/icons/main/ArrowToRight";
import SmallArrowToLeftIcon from "../../assets/icons/common/SmallArrowToLeftIcon";

const CustomPagination: FC = ({

                    }) => {

    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return (
                <div className="pagination-to-left">
                    <SmallArrowToLeftIcon/>
                    <p>Назад</p>
                </div>
            );
        }
        if (type === 'next') {
            return (
                <div className="pagination-to-right">
                    <p>Вперед</p>
                    <SmallArrowToLeftIcon/>
                </div>
            );
        }
        return originalElement;
    };

    return (
        <Pagination
            onChange={(page, pageSize): any => {}}
            defaultCurrent={1}
            current={1}
            pageSize={10}
            total={100}
            showSizeChanger={false}
            itemRender={itemRender}
        />
    );
};

export default CustomPagination;