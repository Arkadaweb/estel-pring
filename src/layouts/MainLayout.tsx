import React, {FC, PropsWithChildren} from 'react';
import Header from "../components/Header/Header.";
import Footer from "../components/Footer/Footer";
import HeaderMob from "../components/Header/HeaderMob";

const MainLayout: FC<PropsWithChildren<any>> = ({
                                                    footerMarginTop,
                                                    children,
                                                    categories,
                                                    contacts,
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
            <Header
                categories={categories}
                contacts={contacts}
            />
            <HeaderMob
                categories={categories}
                contacts={contacts}
            />
            <div style={{flex: 1}}>
                {children}
            </div>
            <Footer
                footerMarginTop={footerMarginTop}
                contacts={contacts}
            />
        </div>
    );
};

export default MainLayout;
