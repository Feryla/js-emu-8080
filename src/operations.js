export const getRpKeyLow = pattern => {
  switch (pattern) {
    case 0b00:
      return 'c';
    case 0b01:
      return 'e';
    case 0b10:
      return 'l';
    default:
      throw new Error('Invalid RP pattern');
  }
};

export const getRpKeyHigh = pattern => {
  switch (pattern) {
    case 0b00:
      return 'b';
    case 0b01:
      return 'd';
    case 0b10:
      return 'h';
    default:
      throw new Error('Invalid RP pattern');
  }
};

const ops = {
  lxi(state, rp) {
    const low = state.memory[state.pc + 1];
    const high = state.memory[state.pc + 2];
    if (rp === 0b11) {
      state.sp = ((0x00 | high) << 8) | low;
    } else {
      // state.setValue(State8080.getRpKeyLow(rp), low);
      // state.setValue(State8080.getRpKeyHigh(rp), high);
    }
    this.incrementPc(state, 3);
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
