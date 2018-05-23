import CPU8080 from './CPU8080';
import { freshState } from './stateUtil';

class EMU8080 {
  constructor() {
    this.running = false;
    this.state = freshState();
    this.cpu = new CPU8080();
  }

  get registers() {
    return this.state.registers;
  }

  get memory() {
    return this.state.memory;
  }

  load(rom) {
    const memory = new Uint8Array(65536);
    rom.forEach((el, index) => {
      memory[index] = el;
    });
    this.state = Object.assign({}, freshState(), { memory });
  }

  pause() {
    this.running = false;
  }

  step(n) {
    let count = 0;
    while (count < n) {
      count += 1;
      const newState = this.cpu.process(this.state);
      this.state = newState;
    }
  }

  run() {
    this.running = true;
    while (this.running) {
      const newState = this.cpu.process(this.state);
      this.state = newState;
    }
  }
}

export default EMU8080;
