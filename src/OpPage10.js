const OpPage = require('./OpPage');

class OpPage10 extends OpPage {
  processOp(state, y, z) {
    switch (z) {
      default:
        this.ops.unsupported();
    }
    return state;
  }
}

module.exports = OpPage10;
