import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import Image from "next/dist/client/legacy/image";

import bcg from '../../../../public/main-page-stand-bcg.png'

const StandSection: FC<PropsWithChildren<any>> = ({
                                                      about
                                                  }) => {

    return (
        <div className="stand-section">
            <MaxWithLayout>
                <div className="stand-section-content">
                    <h3 className="stand-section-content-title"
                       dangerouslySetInnerHTML={{__html: about?.title || ''}}/>
                    <div className="stand-section-content-line"/>
                    <div className="stand-section-content-items">
                        {
                            about?.stands?.map((item: any) =>
                                <div className="stand-section-content-items-item">
                                    <h4>
                                        {item?.title}
                                    </h4>
                                    <p>
                                        {item?.description}
                                    </p>
                                </div>
                            )
                        }
                    </div>
                    <div className="stand-section-content-img-wrap">
                        <div className="stand-section-content-img">
                            <Image
                                src={about?.image}
                                layout={'fill'}
                            />
                        </div>
                    </div>
                </div>
            </MaxWithLayout>
        </div>
    );
};

export default StandSection;
