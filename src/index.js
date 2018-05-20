const fs = require('fs');
const CPU8080 = require('./CPU8080');

const rom = fs.readFileSync('./data/invaders.rom');

const cpu = new CPU8080();

cpu.load(rom);

let x = 0;
while (x < 10) {
  x += 1;
  cpu.emulateOp();
}
