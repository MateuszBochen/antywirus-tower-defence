
class Tower {
  constructor(towerInfo) {
    /**
     * shuts per second
     */
    this.frequency = towerInfo.frequency;

    /**
     * tower range
     */
    this.range = (towerInfo.range * 50) + 25;

    /**
     * tower bullet damage
     */
    this.bulletDamage = towerInfo.bulletDamage;

    /**
     * tower bullet speed
     */
    this.bulletSpeed = towerInfo.bulletSpeed;


    this.y = towerInfo.y;
    this.x = towerInfo.x;

    this.lastShutTime = 1;

    this.image = new Image();
    this.image.src = `/tower/${towerInfo.image}.png`;

    this.image.onload = () => {
      this.imageIsReady = true;
      console.log('tower sie zaladowal');
    };
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

export default Tower;
