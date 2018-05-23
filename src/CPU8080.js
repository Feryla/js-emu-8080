import { copyState } from './stateUtil';

const OpPage00 = require('./OpPage00');
const OpPage01 = require('./OpPage01');
const OpPage10 = require('./OpPage10');
const OpPage11 = require('./OpPage11');

class CPU8080 {
  constructor() {
    this.opPages = {
      0b00: new OpPage00(),
      0b01: new OpPage01(),
      0b10: new OpPage10(),
      0b11: new OpPage11()
    };
  }

  /**
   * Process the current state. Finds current opcode
   * indicated by the pc-register and executes the given operation
   * @param state the current state
   * @returns the new state
   */
  process(state) {
    const newState = copyState(state);
    const opCode = newState.memory[newState.registers.pc];

    const xx = (opCode >> 6) & 0b11;
    const yyy = (opCode >> 3) & 0b111;
    const zzz = opCode & 0b111;

    this.opPages[xx].processOp(newState, yyy, zzz);
    return newState;
  }
}

module.exports = CPU8080;
