const OpPage = require('./OpPage');

class OpPage01 extends OpPage {
  processOp(state, y, z) {
    return this.ops.mov(state, y, z);
  }
}

module.exports = OpPage01;
