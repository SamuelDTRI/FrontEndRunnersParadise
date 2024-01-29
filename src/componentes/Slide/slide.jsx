import React from 'react';
import { Carousel } from 'antd';
import one from "../../assets/visa.png";
import two from "../../assets/Naranja.png";
import three from "../../assets/Enero.png";
import four from "../../assets/Tarjeta.png";
import style from "./Slide.module.css"

const contentStyle = {
  height: '200px',
  width: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'transparent',
};


const Slide = () => (
  <Carousel autoplay style={{width: '400px', height: '200px'}}>
      <div>
        <img src={one} style={contentStyle}></img>
      </div>
      <div>
      <img src={two} style={contentStyle}></img>
      </div>
      <div>
      <img src={three} style={contentStyle}></img>
      </div>
      <div>
      <img src={four} style={contentStyle}></img>
      </div>
  </Carousel>
);
export default Slide;