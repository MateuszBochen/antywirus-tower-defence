import React, { Component } from 'react';

class Antivirus extends Component {

  onMouseDownHandler = (e) => {
    this.props.onMouseDown(e, this.props.img, this.props.index);
  };

  render() {
    return (
      <div className="shop-item" onMouseDown={this.onMouseDownHandler}  draggable={true} onDrag={(e) => {console.log('drag')}}>
        <div>
          <img src={`/tower/${this.props.img}.png`} />
          <span>{this.props.name}</span>
        </div>
      </div>
    );
  }
}

export default Antivirus;

