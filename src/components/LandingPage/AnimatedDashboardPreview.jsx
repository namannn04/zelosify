import React from "react";
import videoFile from "../../assets/video/text.mp4";

const VideoDelivery = () => {
    return (
        <div className="flex justify-center items-center bg-[#0F071F] overflow-hidden pt-24 sm:pt-12  px-0 sm:px-12">
            <video
                className="sm:w-[60%] w-[100%]  object-contain"
                loop
                autoPlay
                muted
            >
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoDelivery;
