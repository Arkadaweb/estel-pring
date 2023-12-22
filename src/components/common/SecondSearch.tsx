import React, {FC, PropsWithChildren} from 'react';
import {Input} from "antd";

const SecondSearch: FC<PropsWithChildren<any>> = ({
    ...props
                                                  }) => {

    return (
        <div className="second-search-input">
            <Input
                // suffix={<SearchIcon/>}
                style={{
                    height: 49,
                    borderRadius: 13,
                    backgroundColor: 'rgba(53, 53, 53, 0.05)'
                }}
                {...props}
            />
        </div>
    );
};

export default SecondSearch;