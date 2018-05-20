const OpPage = require('./OpPage');

class OpPage00 extends OpPage {
  processOp(state, y, z) {
    switch (z) {
      case 0b00:
        this.ops.nop(state);
        break;
      default:
        this.ops.unsupported();
    }
  }
}

module.exports = OpPage00;
