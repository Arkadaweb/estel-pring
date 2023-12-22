import React, {FC, PropsWithChildren} from 'react';
import Header from "../components/Header/Header.";
import Footer from "../components/Footer/Footer";
import HeaderMob from "../components/Header/HeaderMob";

const MainLayout: FC<PropsWithChildren<any>> = ({
                                                    footerMarginTop,
                                                    children,
                                                    menu
}) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            justifyContent: "space-between"
        }}>
            <Header menu={menu}/>
            <HeaderMob menu={menu}/>
            <div style={{flex: 1}}>
                {children}
            </div>
            <Footer footerMarginTop={footerMarginTop}/>
        </div>
    );
};

export default MainLayout;