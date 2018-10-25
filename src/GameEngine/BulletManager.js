

class BulletManager {
  constructor(context, monstersCollection) {
    this.collection = [];
    this.context = context;
    this.monstersCollection = monstersCollection;
  }


  addBullet(bullet) {
    this.collection.push(bullet);
  }

  render() {
    // console.log(this.collection.length);
    this.collection.forEach((bullet, bulletIndex) => {
      const pos = BulletManager.currentBulletPos(bullet);

      this.context.fillStyle = `rgba(255, 0, 0)`;
      this.context.fillRect(pos[0], pos[1], 4, 4);

      if(pos[0] > 1000 || pos[1] > 1000 || pos[0] < 0 || pos[1] < 0) {
        this.collection.splice(bulletIndex, 1);
      }
      // const { targetPos } = bullet;

      this.monstersCollection.forEach((monster) => {
        const monsterPos = monster.getCurrentPosition();
        if (pos[0] >= monsterPos[0] && pos[0] <= (monsterPos[0] + 50) && pos[1] >= monsterPos[1] && pos[1] <= (monsterPos[1] + 50)) {
          // console.log('trafilem wieprza');
          monster.currentLive -= bullet.damage;
          this.collection.splice(bulletIndex, 1);
        }
      });

      /*this.context.beginPath();
      this.context.moveTo(bullet.startPos[0],bullet.startPos[1]);
      // this.context.lineTo((bullet.targetPos[0] + 25), (bullet.targetPos[1] + 25));
      this.context.lineTo((pos[0]), (pos[1]));
      this.context.stroke();*/

    });
  }


  static currentBulletPos(bullet) {

    const xDiff = (bullet.startPos[0] + 25) - (bullet.targetPos[0] + 25);
    const yDiff = (bullet.startPos[1] + 25) - (bullet.targetPos[1] + 25);

    const ctg = BulletManager.arcctg(xDiff / yDiff);
    // const ctg = BulletManager.toRadian(BulletManager.toDag(ctg2) - 180);

    const x = (bullet.distance * Math.cos(ctg)) + (bullet.startPos[0] + 25);
    const y = (bullet.distance * Math.sin(ctg)) + (bullet.startPos[1] + 25);

    if (yDiff < 0) {
      bullet.distance += bullet.speed;
    } else {
      bullet.distance -= bullet.speed;
    }

    return [x, y];
  }

  static arcctg(x) { return Math.PI / 2 - Math.atan(x); }

  /*static toRadian (degrees) {
    return degrees * Math.PI / 180;
  }

  static toDag(radians) {
    return radians * 180 / Math.PI;
  }*/
}

export default BulletManager;
