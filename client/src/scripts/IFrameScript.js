import React, { Component } from "react";

class IFrameComponent extends Component {
  componentDidMount() {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.count = 0;
    this.section = {
      start: this.props.start,
      end: this.props.end,
    };

    window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
  }

  componentWillUnmount() {
    delete window.onYouTubeIframeAPIReady;
  }

  onYouTubeIframeAPIReady = () => {
    this.player = new window.YT.Player("player", {
      height: "360",
      width: "640",
      videoId: this.props.youtubeID,
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  };

  onPlayerReady = (event) => {
    this.player.seekTo(this.section.start);
    this.player.playVideo();
  };

  onPlayerStateChange = (event) => {
    if (
      event.data === window.YT.PlayerState.PLAYING &&
      this.count < this.props.time
    ) {
      var duration = this.section.end - this.section.start;
      setTimeout(this.restartVideoSection, duration * 1000);
      this.count++;
    } else if (this.count === this.props.time) {
      this.player.pauseVideo();
    }
  };

  restartVideoSection = () => {
    this.player.seekTo(this.section.start);
  };

  render() {
    return <div id="player"></div>;
  }
}

export default IFrameComponent;
