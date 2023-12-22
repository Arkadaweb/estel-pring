import React, {FC, PropsWithChildren, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import Image from "next/dist/client/legacy/image";
import PlayIcon from "../../../assets/icons/product/PlayIcon";

const MediaBlock: FC<PropsWithChildren<any>> = ({type, url, preview}) => {

    const [isFullScreen, setFullScreen] = useState(false);

    const openFullScreen = () => {
        setFullScreen(true);
    };

    const closeFullScreen = () => {
        setFullScreen(false);
    };

    return (
        <div className="product-media">

            {type === 'video' ? (
                <div className="product-media-img">
                    <Image
                        src={preview}
                        alt="Thumbnail"
                        onClick={openFullScreen}
                        layout={'fill'}
                    />
                    <div className="product-media-play-button">
                        <PlayIcon/>
                    </div>
                    {isFullScreen && (
                        <div className="fullscreen-overlay" >
                            <div className="fullscreen-overlay-content">
                                <video controls>
                                    <source src={url} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="fullscreen-overlay-close" onClick={closeFullScreen}>
                                x
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="product-media-img">
                    <Image
                        src={url}
                        alt="Image"
                        onClick={openFullScreen}
                        layout={'fill'}
                    />
                    {isFullScreen && (
                        <div className="fullscreen-overlay">
                            <div className="fullscreen-overlay-content">
                                <Image
                                    src={url}
                                    alt="Image"
                                    onClick={openFullScreen}
                                    layout={'fill'}
                                />
                            </div>
                            <div className="fullscreen-overlay-close" onClick={closeFullScreen}>
                                x
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MediaBlock;