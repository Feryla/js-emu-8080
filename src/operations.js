const State8080 = require('./State8080');

const ops = {
  nop(state) {
    return this.incrementPc(state, 1);
  },
  unsupported() {
    throw new Error('Unsupported op');
  },
  jmp(state) {
    const low = state.memory[state.pc + 1];
    const high = state.memory[state.pc + 2];
    state.pc = ((0x00 | high) << 8) | low;
  },
  lxi(state, rp) {
    const low = state.memory[state.pc + 1];
    const high = state.memory[state.pc + 2];
    if (rp === 0b11) {
      state.sp = ((0x00 | high) << 8) | low;
    } else {
      state.setValue(State8080.getRpKeyLow(rp), low);
      state.setValue(State8080.getRpKeyHigh(rp), high);
    }
    this.incrementPc(state, 3);
  },
  call(state) {
    state.memory[state.sp - 1] = state.pc >> 8;
    state.memory[state.sp - 2] = state.pc & 0b11111111;
    state.sp -= 2;
    this.jmp(state);
  },
  lda(state) {
    const low = state.memory[state.pc + 1];
    const high = state.memory[state.pc + 2];
    state.a = state.memory[((0x00 | high) << 8) | low];
    this.incrementPc(state, 3);
  },
  sta(state) {
    const low = state.memory[state.pc + 1];
    const high = state.memory[state.pc + 2];
    state.memory[((0x00 | high) << 8) | low] = state.a;
    this.incrementPc(state, 3);
  }
};

module.exports = ops;
