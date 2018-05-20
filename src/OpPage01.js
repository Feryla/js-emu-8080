const OpPage = require('./OpPage');

class OpPage01 extends OpPage {
  processOp(state, y, z) {
    switch (z) {
      default:
        this.ops.unsupported();
    }
  }
}

module.exports = OpPage01;
