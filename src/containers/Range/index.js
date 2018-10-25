import React, { Component } from 'react';

class Range extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: 0,
      top: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.x !== this.state.left && nextProps.y !== this.state.top) {
      this.setState({
        top: 0,
        left: 0,
      });

    }
  }

  onMouseMoveHandler = (e) => {

    const radius = (this.props.tower.range * 50) + 50 || 0;
    this.setState({
      top: e.clientY - (radius / 2),
      left: e.clientX - (radius / 2),
    });
  };

  render() {

    const radius = (this.props.tower.range * 50) + 50 || 0;
    const propsLeft = this.props.x - (radius / 2) || 0;
    const propsTop = this.props.y - (radius / 2) || 0;

    const { top, left } = this.state;

    const style = {
      display: this.props.show ? 'flex' : 'none',
      width: radius,
      height: radius,
      top: top || propsTop,
      left: left|| propsLeft,
      backgroundImage: `url(/tower/${this.props.tower.image}.png)`,
    };

    return (
      <div
        className="show-range"
        style={style}
        onMouseUp={(e) => this.props.onMouseUp(e)}
        onMouseMove={this.onMouseMoveHandler}
      >

      </div>
    );
  }
}

export default Range;
