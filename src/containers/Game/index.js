import React, { Component } from 'react';
import Antivirus from '../Antivirus';
import Range from '../Range';
import Init from '../../GameEngine/Init';
import './style.css'

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      showRange: false,
      tower: {},
      rangeX: 0,
      rangeY: 0,
    };

    this.game = null;
  }

  onMouseDownHandler = (mouseEvent, imgName, towerIndex) => {
    const tower = Init.towersArray[towerIndex];

    this.setState({
      showRange: true,
      tower,
      rangeX: mouseEvent.clientX,
      rangeY: mouseEvent.clientY,
    });
  };

  onMouseUpHandler = (e) => {
    this.setState({
      showRange: false,
    });
  };

  onMouseDownGameHandler = (e) => {
    console.log(e);
  };

  onMonsterDie = (monster) => {
    this.game.level = Math.floor(this.state.score / 100);
    this.setState({
      score: this.state.score + monster.score,
    });
  };

  componentDidMount() {
    this.game = new Init('game', this.onMonsterDie);
    this.game.newGame();
    this.game.addTowerFormView(0, 11*50, 3*50);
    this.game.addTowerFormView(1, 13*50, 7*50);
    this.game.addTowerFormView(1, 15*50, 12*50);
    this.game.addTowerFormView(2, 13*50, 16*50);

    console.log('RESET');
  }

  render() {
    return (
      <div>
        <div className="user-panel">
          <div className="score">
            Score: {this.state.score}
          </div>
          <div className="shop">
            <Antivirus img={1} name="Avast" onMouseDown={this.onMouseDownHandler} index={0} />
            <Antivirus img={2} name="AVG" onMouseDown={this.onMouseDownHandler} index={1} />
            <Antivirus img={4} name="Kaspersky" onMouseDown={this.onMouseDownHandler} index={2} />
          </div>
        </div>
        <div className="game-panel">
          <canvas id="game" width="1000" height="1000" draggable={true} onDropCapture={this.onMouseDownGameHandler}>
            Troche lipa
          </canvas>
        </div>
        <Range
          tower={this.state.tower}
          show={this.state.showRange}
          x={this.state.rangeX}
          y={this.state.rangeY}
          onMouseUp={this.onMouseUpHandler}
        />
      </div>
    );
  }
}

export default Game;
