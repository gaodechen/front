import React, { Component } from 'react';
import { Carousel } from 'antd';

import './style.css'

class WrappedCarousel extends Component {
  getCarousel = () => {
    let carousels = [];
    for (var i = 0; i < this.props.num; i++) {
      carousels.push(
        <div key={i}>
          <div
            className="poster-title"
            style={{ background: 'url(' + this.props.carousel[i].src + ')' }}
          >
            <div className="title-content">
              <h3>{this.props.carousel[i].description}</h3>
            </div>
            <h2>歌单推荐</h2>
          </div>
        </div>
      );
    }
    return carousels;
  }

  render() {
    return (
      <Carousel autoplay>
        {this.getCarousel()}
      </Carousel>
    )
  }
}

WrappedCarousel.defaultProps = {
  carousel: [
  ]
}

export default WrappedCarousel;