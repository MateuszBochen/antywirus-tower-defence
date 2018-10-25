

class Monster {
  constructor(monsterInfo) {
    this.speed = monsterInfo.speed;
    this.currentLive = monsterInfo.live;
    this.maxLive = monsterInfo.live;
    this.score = monsterInfo.score;

    this.x = 0;
    this.y = 100;
    this.image = null;
    this.imageIsReady = false;
    this.lastSetTime = 0;
    this.lastMove = '';
    this.selfPath = {};

    this.image = new Image();
    this.image.src = `/virus/${monsterInfo.image}.png`;

    this.image.onload = () => {
      this.imageIsReady = true;
      console.log('monster sie zaladowal');
    };

    // console.log('monster');
  };

  setPath(x, y) {
    const key = `${x}-${y}`;
    this.selfPath[key] = true;
  }

  canGoTo(x, y) {
    const key = `${x}-${y}`;
    // console.log(key);
    return !this.selfPath[key];
  }


  getCurrentPosition() {
    return [this.x, this.y];
  }


  getImage() {
    if(this.imageIsReady) {
      return this.image;
    }
    return false;
  }
}

export default Monster;
