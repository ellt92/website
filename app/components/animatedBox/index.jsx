import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { media } from "styles";

const images = {};

function importAll(r) {
  r.keys().forEach(item => {
    images[`${item.replace("./", "")}`] = r(item);
  });
}

importAll(require.context("assets/animation", false, /\.(png|jpg|svg)$/));

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  ${media.phone`
    display: none;
    `};
`;

const Styling = styled.img`
  position: fixed;
  background-size: cover;
  background-position: center;
  width: 50%;
  min-width: 400px;
  margin-top: -50px;
  max-width: 550px;
`;

function mapStateToProps(state) {
  return {
    position: state.scroll.position
  };
}

class AnimatedBoxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: images["Comp1000.png"]
    };
  }
  componentWillUpdate(nextProps, nextState) {
    let imageIndex =
      1000 + Math.floor(nextProps.position / (window.innerHeight * 0.9) * 30);
    this.setState({
      image: images[`Comp${imageIndex}.png`]
    });
  }
  render() {
    console.log(images);
    const { image } = this.state;
    return (
      <Wrap>
        {Object.keys(images).map(i => {
          return <link rel="preload" href={images[i]} as="image" />;
        })}
        <Styling src={image}>Hello World</Styling>
      </Wrap>
    );
  }
}

export default connect(mapStateToProps)(AnimatedBoxComponent);
