const ops = require('./operations');

class OpPage {
  constructor() {
    this.ops = ops;
  }
  processOp(state, y, z) {
    this.ops.unsupported(state, y, z);
  }
}

module.exports = OpPage;
