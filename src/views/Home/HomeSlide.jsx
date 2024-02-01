import React from "react";
import { Carousel } from "antd";
import one from "../../assets/bannernike1.jpg";
import two from "../../assets/bannernb1.jpg";
import three from "../../assets/banneradidas1.jpg";
import { Link } from "react-router-dom";

const contentStyle = {
  width: "100%",
  height: "100%",
  color: "#fff",
  backgroundColor: "white",
};

const HomeSlide = () => (
  <div>
    <div>
      <Carousel
        autoplay
        style={{ width: "1518px", height: "100%", borderRadius: "none" }}
      >
        <div>
          <a href="#catalogue">
            <img src={one} style={contentStyle}></img>
          </a>
        </div>
        <div>
          <a href="#catalogue">
            <img src={two} style={contentStyle}></img>
          </a>
        </div>
        <div>
          <a href="#catalogue">
            <img src={three} style={contentStyle}></img>
          </a>
        </div>
      </Carousel>
    </div>
  </div>
);
export default HomeSlide;
