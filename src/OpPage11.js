const OpPage = require('./OpPage');

class OpPage11 extends OpPage {
  processOp(state, y, z) {
    switch (z) {
      default:
        this.ops.unsupported();
    }
  }
}

module.exports = OpPage11;
