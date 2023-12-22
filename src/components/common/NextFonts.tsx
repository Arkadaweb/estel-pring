import localFont from 'next/font/local'
import React from "react";

const suisseIntl = localFont({
    src: [
        {
            path: '../../assets/fonts/Manrope-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Manrope-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Manrope-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Manrope-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-base',
    fallback: ['sans-serif'],
})


export const NextFonts = () => {
    return (
        <style jsx global>{`
          :root {
            --font-base: ${suisseIntl.style.fontFamily};
          }
    `}</style>
    )
}
