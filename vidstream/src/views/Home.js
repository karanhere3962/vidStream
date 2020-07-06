import React, { Component } from "react";
import VideoCard from "../components/VideoCard/VideoCard";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome Home</h1>
        <VideoCard />
      </div>
    );
  }
}

export default Home;
