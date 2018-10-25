
class Bullet {
  constructor(damage, speed, startPos, targetPos) {
    this.damage = damage;
    this.speed = speed;
    this.startPos = startPos;
    this.targetPos = targetPos;

    this.distance = 1;
  }
}

export default Bullet;
