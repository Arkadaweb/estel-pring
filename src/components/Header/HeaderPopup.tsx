import React, {FC, PropsWithChildren} from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import Link from "next/link";
import Image from 'next/image'

const HeaderPopup: FC<PropsWithChildren<any>> = ({
                                                     subMenu,
                                                     parent,
                                                     image
                                                 }) => {

    const generateLink = (link: any) => {
        return '/catalog/' + parent + "/" + link
    }

    return (
        <MaxWithLayout>
            <div className="header-popup">
                <div className="header-popup-nav">
                    {subMenu?.map((item: any) =>
                        <Link key={item?.id} href={generateLink(item?.term?.slug)}>
                            {item.title}
                        </Link>
                    )}
                </div>
                <div className="header-popup-img">
                    <Image
                        src={image}
                        alt="Picture of the author"
                        fill
                    />
                </div>
            </div>
        </MaxWithLayout>
    );
};

export default HeaderPopup;
