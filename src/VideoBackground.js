// src/VideoBackground.js
import React from 'react';
import './VideoBackground.css'; // You will create this CSS file to style the video

const VideoBackground = () => {
    return (
        <div className="video-background">
            <video autoPlay loop muted className="video-bg">
                <source src={`${process.env.PUBLIC_URL}/starrysky.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoBackground;
