
import Maps from './Maps/Maps';
import Grid from './Grid';
import MonstersManager from './MonstersManager';
import TowerManager from './TowerManager';
import BulletManager from './BulletManager';

class Init {

  static monstersArray = [
    { speed: 50, live: 100, image: '1', score: 10},
    { speed: 60, live: 200, image: '2', score: 15},
    { speed: 65, live: 500, image: '3', score: 20},
    { speed: 100, live: 200, image: '4', score: 25},
    { speed: 50, live: 1000, image: '5', score: 50},
  ];

  static towersArray = [
    { frequency: 2, bulletSpeed: 5, bulletDamage: 5, image: '1', range: 2, x: 10, y: 4, price: 100},
    { frequency: 3, bulletSpeed: 7, bulletDamage: 10, image: '2', range: 3, x: 10, y: 4, price: 200},
    { frequency: 4, bulletSpeed: 10, bulletDamage: 15, image: '4', range: 4, x: 10, y: 4, price: 400},
  ];

  static towerInfo = {
      frequency: 5,
      bulletSpeed: 5,
      bulletDamage: 5,
      image: '1',
      range: 2,
      x: 10,
      y: 4,
  };

  constructor(canvasId, monsterDieCallback) {
    this.monsterDieCallback = monsterDieCallback;
    const example = document.getElementById(canvasId);

    this.level = 0;
    // this.monstersCollection = [];
    this.intervalId = '';

    this.context = example.getContext('2d');
    this.context.fillStyle = "rgb(255,0,0)";
    this.context.fillRect(0, 0, 1000, 1000);
    this.lastTimeAddMonster = 0;
    console.log('INIT C');
  }

  addTowerFormView(towerIndex, x, y) {
    const towerInfo = Init.towersArray[towerIndex];

    towerInfo.x = Math.floor((x / 50)) * 50;
    towerInfo.y = Math.floor((y / 50)) * 50;

    this.towerManager.addTower(towerInfo);
  }

  newGame() {
    const map = Maps[0];
    const grid = new Grid(this.context, map);
    const monstersManager = new MonstersManager(this.context, map, this.monsterDieCallback);
    const bulletManager = new BulletManager(this.context, monstersManager.collection);
    this.towerManager = new TowerManager(this.context, monstersManager.collection, bulletManager);

    grid.render();



    // towerManager.addTower(Init.towerInfo);

    this.intervalId = setInterval(() => {
      grid.render();
      this.towerManager.render();
      bulletManager.render();
      monstersManager.render();

      this.monsterGenerator(monstersManager);
    }, 20);

  }

  monsterGenerator(monstersManager) {
    const now = Date.now();
    if (now - this.lastTimeAddMonster <= 2000) {
      return;
    }

    this.lastTimeAddMonster = now;

    const maxMonsters = (this.level + 1) * 2;


    // const intervalId = setInterval(() => {

      const randMonsters = Init.rand(0, Math.min(this.level, Init.monstersArray.length - 1));
      console.log(Math.min(this.level, Init.monstersArray.length - 1), randMonsters, 'rm');
      const monsterInfo = Init.monstersArray[randMonsters];


      if(monstersManager.collection.length >= maxMonsters) {
        // clearInterval(intervalId);
      } else {
        monstersManager.addMonster(monsterInfo);
      }

    // }, 1500);

    //
  }

  static rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

export default Init;