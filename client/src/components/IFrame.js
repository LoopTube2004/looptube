import React from "react";
import YouTube from "react-youtube";
import styles from "./IFrame.module.css";

function IFrame(props) {
    var count = 0;
    const onPlayerReady = (event) => {
        event.target.seekTo(props.start);
        event.target.playVideo();
        //console.log("loop " + props.time + " times");
    };

    const options = {
        height: "360",
        width: "800"
    };

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            if(count < props.time){
                var duration = props.end - props.start;
                setTimeout(() => {
                    event.target.seekTo(props.start);
                }, duration * 1000);
            } else{
                event.target.stopVideo();
            }
            count++;
            //console.log("count " + count);
        }
    };

    return (
        <YouTube
            className={styles["player"]}
            videoId={props.youtubeID}
            opts={options}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
        />
    );
}

export default IFrame;
