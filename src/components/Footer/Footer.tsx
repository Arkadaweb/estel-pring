import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";

const Footer: FC<PropsWithChildren<any>> = ({

                                            }) => {


    return (
        <div className="footer">
            <MaxWithLayout>

                <div style={{
                    width: '100%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                }}>
                    Footer
                </div>
            </MaxWithLayout>
        </div>
    );
};

export default Footer;