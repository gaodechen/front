import React, { Component } from 'react';
import { Carousel } from 'antd';

import './style.css'

/**
 * @description carousel component to show posters
 * @class WrappedCarousel
 * @extends {Component}
 */
class WrappedCarousel extends Component {
  getCarousel = () => {
    let carousels = [];
    for (var i = 0; i < this.props.num; i++) {
      carousels.push(
        <div key={i}>
          <div
            className="poster-title"
          >
            <div className="title-content">
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