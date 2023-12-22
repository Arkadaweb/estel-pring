import React, {FC, PropsWithChildren} from 'react';
import {Pagination, PaginationProps} from "antd";
import PaginationArrowRoLeft from "../../assets/icons/common/PaginationArrowRoLeft";

const CustomPagination: FC<PropsWithChildren<any>> = ({
                                  onChangePage = (page: any) =>{},
                                  sort = 1,
                                  totalCount = 0
                    }) => {

    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return (
                <div className="pagination-to-left">
                    <PaginationArrowRoLeft/>
                </div>
            );
        }
        if (type === 'next') {
            return (
                <div className="pagination-to-right">
                    <PaginationArrowRoLeft/>
                </div>
            );
        }
        return originalElement;
    };

    return (
        <Pagination
            onChange={(page: any, pageSize: any,): any => onChangePage(page)}
            defaultCurrent={1}
            current={Number(sort?.page)}
            pageSize={10}
            total={Number(totalCount)}
            showSizeChanger={false}
            itemRender={itemRender}
        />
    );
};

export default CustomPagination;