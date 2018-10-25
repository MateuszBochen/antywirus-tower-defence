
import Monster from './Monster';

class MonstersManager {
  constructor(context, map, monsterDieCallback) {
    this.collection = [];
    this.context = context;
    this.map = map;
    this.monsterDieCallback = monsterDieCallback;
  }

  addMonster(monsterInfo) {
    const monster = new Monster(monsterInfo);
    this.collection.push(monster);
  }


  render() {
    this.collection.forEach((monster, monsterIndex) => {
      if (monster) {
        this.goGo(monster);
        const newPos = monster.getCurrentPosition();
        const image = monster.getImage();
        if (image) {
          this.context.drawImage(image, newPos[0], newPos[1]);
          this.liveBox(newPos[0], newPos[1], monster.currentLive, monster.maxLive);

          if (monster.currentLive <= 0) {
            this.monsterDieCallback(monster);
            this.collection.splice(monsterIndex, 1);
          }
        }
      }
    })
  }

  liveBox(x,y, live, maxLive) {

    const ofsetY = y - 10;

    this.context.beginPath();
    this.context.lineWidth="1";
    this.context.strokeStyle= `rgba(55, 55, 55)`;
    this.context.rect(x,ofsetY,50, 6);
    this.context.stroke();

    this.context.fillStyle = `rgba(255, 255, 255)`;
    this.context.fillRect(x+1, ofsetY+1, 48, 4);

    const percent = (live / maxLive) * 48;

    this.context.fillStyle = `rgba(0, 255, 0)`;
    this.context.fillRect(x+1, ofsetY+1, percent, 4);

  }

  goGo(monster) {

    const timeMode = (1000 / monster.speed);
    const currentTime = Date.now();
    if(currentTime - monster.lastSetTime < timeMode) {
      return;
    }

    monster.lastSetTime = currentTime;

    let indexMapX = Math.floor(monster.x / 50);
    let indexMapY = Math.floor(monster.y / 50);

    // console.log(monster.lastMove );

    if(monster.lastMove === 'up') {
      indexMapY = Math.ceil(monster.y / 50);
    }
    if(monster.lastMove === 'left') {
      indexMapX = Math.ceil(monster.x / 50);
    }

   /* this.context.beginPath();
    this.context.lineWidth="1";
    this.context.strokeStyle= `rgba(555, 55, 55)`;
    this.context.rect(indexMapX * 50, indexMapY * 50 ,50, 50);
    this.context.stroke();*/

    // this.map[indexMapY][indexMapX] = 2;

    const nextMinX = Math.max(indexMapX - 1, 0);
    const nextMaxX = Math.min(indexMapX + 1, 19);

    const nextMinY = Math.max(indexMapY - 1, 0);
    const nextMaxY = Math.min(indexMapY + 1, 19);

    monster.setPath(indexMapX, indexMapY);
    try {
      if (this.map[indexMapY][nextMaxX] === 1 && monster.canGoTo(nextMaxX, indexMapY)) {
        monster.x += 1;
        monster.lastMove = 'right';
      } else if (this.map[nextMaxY][indexMapX] === 1 && monster.canGoTo(indexMapX, nextMaxY)) {
        monster.y += 1;
        monster.lastMove = 'down';
      } else if (this.map[nextMinY][indexMapX] === 1 && monster.canGoTo(indexMapX, nextMinY)) {
        monster.y -= 1;
        monster.lastMove = 'up';
      } else if (this.map[indexMapY][nextMinX] === 1 && monster.canGoTo(nextMinX, indexMapY)) {
        monster.x -= 1;
        monster.lastMove = 'left';
      } else {

      }
    } catch (e) {
      console.log(e);
      console.log(this.map);
      console.log(indexMapX, indexMapY, monster.x, monster.y);
      console.log('----end of monster manager');
    }



  }

}

export default MonstersManager;
