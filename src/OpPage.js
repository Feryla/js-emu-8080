const ops = require('./instructions');

class OpPage {
  constructor() {
    this.ops = ops;
  }
  processOp(state, y, z) {
    this.ops.unsupported(state, y, z);
    return state;
  }
}

module.exports = OpPage;
