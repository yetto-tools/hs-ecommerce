

import React from 'react';
import ReactDOM from 'react-dom/client';
import $ from 'jquery';
import * as SpriteSpin from "spritespin"

class SpriteSpinComponent extends React.Component {
  constructor(props) {
    super(props);
    this.$el = null;
  }

  componentDidMount() {
    const options = Object.assign({}, this.props.options);
    this.$el.spritespin(options);
    this.api = this.$el.spritespin("api");
    this.data = this.$el.spritespin("data");
  }

  componentDidUpdate() {
    const options = Object.assign({}, this.props.options);
    this.$el.spritespin(options);
  }

  componentWillUnmount() {
    this.$el.spritespin('destroy');
  }

  render() {
    return React.createElement('div', {
      ref: (el) => this.$el = $(el)
    });
  }
}

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
      source: '/assets/img/product/360/snapback_{frame}.jpg',
      width: 480,
      height: 327,
      frames: [1,200],
      framesX: 6,
      sense: -1
    };
    this.ssc = null;
    this.state = { show: true };
  }

  onCreateDestroyClicked() {
    this.setState((state) => ({ show: !state.show }));
  }

  onPrevClicked() {
    if (this.ssc) {
      this.ssc.api.stopAnimation();
      this.ssc.api.prevFrame();
    }
  }

  onNextClicked() {
    if (this.ssc) {
      this.ssc.api.stopAnimation();
      this.ssc.api.nextFrame();
    }
  }

  onToggleClicked() {
    if (this.ssc) {
      this.ssc.api.toggleAnimation();
    }
  }

  onFullscreenClicked() {
    if (this.ssc) {
      this.ssc.api.requestFullscreen();
    }
  }

  render() {
    return React.createElement('div', {},
      React.createElement('button', { onClick: this.onCreateDestroyClicked.bind(this) }, "CREATE | DESTROY"),
      React.createElement('button', { onClick: this.onPrevClicked.bind(this) }, "PREV"),
      React.createElement('button', { onClick: this.onNextClicked.bind(this) }, "NEXT"),
      React.createElement('button', { onClick: this.onToggleClicked.bind(this) }, "TOGGLE"),
      React.createElement('button', { onClick: this.onFullscreenClicked.bind(this) }, "FULLSCREEN"),
      this.state.show ? React.createElement(SpriteSpinComponent, { options: this.options, ref: (ssc) => { this.ssc = ssc; } }) : null
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('react-container'));
root.render(React.createElement(ParentComponent, {}));
