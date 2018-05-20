const State8080 = require('./State8080');
const OpPage00 = require('./OpPage00');
const OpPage01 = require('./OpPage01');
const OpPage10 = require('./OpPage10');
const OpPage11 = require('./OpPage11');

class CPU8080 {
  constructor() {
    this.state = new State8080();
    this.opPages = {
      0b00: new OpPage00(),
      0b01: new OpPage01(),
      0b10: new OpPage10(),
      0b11: new OpPage11()
    };
  }

  getCurrentOp() {
    return this.state.memory[this.state.pc];
  }

  emulateOp() {
    const opCode = this.getCurrentOp();
    console.log((opCode >>> 0).toString(2));

    const xx = (opCode >> 6) & 0b11;
    const yyy = (opCode >> 3) & 0b111;
    const zzz = opCode & 0b111;

    this.opPages[xx].processOp(this.state, yyy, zzz);
  }

  load(rom) {
    const { memory } = this.state;
    rom.forEach((el, index) => {
      memory[index] = el;
    });
    this.state.memory = memory;
  }
}

module.exports = CPU8080;
