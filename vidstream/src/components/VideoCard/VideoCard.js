import React, { Component } from "react";
import "./VideoCard.css";
class VideoCard extends Component {
  render() {
    return (
      <div className="videoCardHolder d-flex flex-column">
        <video className="videoCard w-100" controls>
          <source
            src="/media/videos/Jenkins_Interview_Questions_-_Top_50_Jenkins_Interview_Questions_and_Answers_-_Edureka.mp4"
            type="video/mp4"
          />
          Your browser is not compatible.
        </video>
        <div className="videoTitle">
          <p className="hideExcess">
            This is a very logn video title Video Title and generally it
            shouldn't be this long
          </p>
        </div>
        <div className="videoDetails d-flex flex-row w-100 justify-content-between">
          <p>2 watched</p>
          <span className="likeDislike">
            <span>2 likes</span>
            <span>1 dislike</span>
          </span>
        </div>
        <div videoDescription>
          <p>Video Description</p>
        </div>
      </div>
    );
  }
}

export default VideoCard;
