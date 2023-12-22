import React from 'react';
import {Button} from "antd";

const ButtonCustom = ({
                          fontSize = 18,
                          padding = '10px 35px',
                          backgroundColor = 'rgba(75, 103, 233, 1)',
                          color = '#fff',
                          text = '',
                          fontWeight = 600,
                          borderRadius = 10,
                          isLoading,
                          width = 'auto',
                          onPress = () => {},
                          height = '100%',
                          border,
                      }: any) => {
    return (
        <Button
            onClick={() => onPress()}
            loading={isLoading}
            style={{
                width: width,
                fontSize,
                padding,
                backgroundColor,
                color,
                fontWeight,
                borderRadius,
                cursor: 'pointer',
                borderColor: border || backgroundColor,
                height,
            }}
            className="custom-button"
            htmlType={"submit"}
        >
            {text}
        </Button>
    );
};

export default ButtonCustom;