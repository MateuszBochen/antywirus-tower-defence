
import Tower from './Tower';
import Bullet from './Bullet';

class TowerManager {
  constructor(context, monstersCollection, bulletManager) {
    this.context = context;
    this.monstersCollection = monstersCollection;
    this.bulletManager = bulletManager;

    this.collection = [];
  }

  addTower(towerInfo) {
    const tower = new Tower(towerInfo);
    this.collection.push(tower);
  }

  render() {
    this.collection.forEach((item) => {
      const newPos = item.getCurrentPosition();
      const image = item.getImage();

      if(image) {
        this.context.drawImage(image, newPos[0], newPos[1]);
        this.monstersCollection.forEach((monster) => {
          this.shut(item, monster);
        })
      }
    })
  }

  shut(tower, monster) {
    const monsterPos = monster.getCurrentPosition();
    const towerPos = tower.getCurrentPosition();

    const xDiff = Math.abs((towerPos[0] + 25) - (monsterPos[0] + 25));
    const yDiff = Math.abs((towerPos[1] + 25) - (monsterPos[1] + 25));

    const monsterRange = TowerManager.pitagoras(xDiff, yDiff);
    if(monsterRange <= tower.range) {
        const timeMode = (1000 / tower.frequency);
        const currentTime = Date.now();
        if(currentTime - tower.lastShutTime > timeMode) {
          // console.log('strzelam');
          const bullet = new Bullet(tower.bulletDamage, tower.bulletSpeed, towerPos, monsterPos);
          this.bulletManager.addBullet(bullet);
          tower.lastShutTime = currentTime;
        }
    }

  }


  static pitagoras(x, y) {
    const aSquare = Math.pow(x, 2);
    const ySquare = Math.pow(y, 2);

    return Math.sqrt(aSquare + ySquare);
  }
}

export default TowerManager;
