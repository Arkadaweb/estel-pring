import React from 'react';

const CircleArrow = () => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_325_2433)">
                <circle cx="11" cy="11" r="11" transform="matrix(1 0 0 -1 5 25)" fill="#3586FF"/>
            </g>
            <path
                d="M11.1464 15.3535C11.2402 15.4473 11.3673 15.4999 11.4999 15.4999C11.6325 15.4999 11.7596 15.4473 11.8534 15.3535L15.9999 11.207L20.1464 15.3535C20.1925 15.4013 20.2477 15.4394 20.3087 15.4656C20.3697 15.4918 20.4353 15.5056 20.5017 15.5061C20.5681 15.5067 20.6339 15.4941 20.6954 15.4689C20.7568 15.4438 20.8126 15.4067 20.8596 15.3597C20.9065 15.3128 20.9437 15.2569 20.9688 15.1955C20.9939 15.134 21.0066 15.0682 21.006 15.0018C21.0054 14.9354 20.9916 14.8698 20.9654 14.8088C20.9392 14.7478 20.9011 14.6926 20.8534 14.6465L16.3534 10.1465C16.2596 10.0528 16.1325 10.0001 15.9999 10.0001C15.8673 10.0001 15.7402 10.0528 15.6464 10.1465L11.1464 14.6465C11.0527 14.7403 11 14.8674 11 15C11 15.1326 11.0527 15.2598 11.1464 15.3535Z"
                fill="white"/>
            <defs>
                <filter id="filter0_d_325_2433" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="2.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 0.145098 0 0 0 0 0.145098 0 0 0 0 0.145098 0 0 0 0.2 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_325_2433"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_325_2433" result="shape"/>
                </filter>
            </defs>
        </svg>

    );
};

export default CircleArrow;