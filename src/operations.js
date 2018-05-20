const ops = {
  nop(state) {
    state.pc += 1;
  },
  unsupported() {
    throw new Error('Unsupported op');
  },
  mov(dest, source) {
    this.state.setValue(dest, this.state.getValue(source));
  }
};

module.exports = ops;
