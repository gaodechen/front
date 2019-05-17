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
            className="carousel-poster"
            style={{
              backgroundImage: 'url(' + this.props.carousel[i].src + ')',
              height: 'calc(100vh - 64px)'
            }}
          >
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
  carousel: [{
    description: 'Album 1',
    src: 'http://127.0.0.1:3002/static/poster/2.jpg',
  }, {
    description: 'Album 2',
    src: 'http://127.0.0.1:3002/static/poster/2.jpg',
  }, {
    description: 'Album 3',
    src: 'http://127.0.0.1:3002/static/poster/2.jpg',
  }],
}

export default WrappedCarousel;