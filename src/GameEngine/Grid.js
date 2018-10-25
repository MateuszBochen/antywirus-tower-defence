
class Grid {
  constructor(context, map) {
    this.colorNoEntryField = [172, 119, 16];
    this.colorNoEntryBorder = [140, 94, 6];

    this.colorEntryField = [6, 140, 28];
    this.colorEntryBorder = [37, 159, 57];

    this.map = map;
    this.context = context;
  }

  render() {
    // console.log('rerender');
    const maxY = this.map.length;
    const maxX = this.map[0].length;
    let y = 0;
    let x = 0;
    while(y < maxY) {
      x = 0;
      while (x < maxX) {

        this.drawField(x, y);
        x += 1;
      }
      y += 1;
    }
  }

  drawField (x, y) {
    const filedType = this.map[y][x];
    this.context.beginPath();
    this.context.lineWidth="1";
    const xStart = x * 50;
    const yStart = y * 50;

    if(filedType === 0) {
      this.context.strokeStyle= `rgba(${this.colorNoEntryBorder[0]}, ${this.colorNoEntryBorder[1]}, ${this.colorNoEntryBorder[2]})`;
      this.context.rect(xStart,yStart,50,50);
      this.context.stroke();

      this.context.fillStyle = `rgba(${this.colorNoEntryField[0]}, ${this.colorNoEntryField[1]}, ${this.colorNoEntryField[2]})`;
      this.context.fillRect(xStart+1, yStart+1, 48, 48);
    } else {
      this.context.strokeStyle= `rgba(${this.colorEntryField[0]}, ${this.colorEntryField[1]}, ${this.colorEntryField[2]})`;
      this.context.rect(xStart,yStart,50,50);
      this.context.stroke();

      this.context.fillStyle = `rgba(${this.colorEntryBorder[0]}, ${this.colorEntryBorder[1]}, ${this.colorEntryBorder[2]})`;
      this.context.fillRect(xStart+1, yStart+1, 48, 48);
    }
  }
}

export default Grid;
