const OpPage = require('./OpPage');

class OpPage11 extends OpPage {
  processOp(state, y, z) {
    switch (z) {
      case 0b011:
        switch (y) {
          case 0b000:
            return this.ops.jmp(state);
          case 0b101:
            return this.ops.xchg(state);
          default:
            this.ops.unsupported();
        }
        break;
      case 0b101:
        switch (y) {
          case 0b001:
            return this.ops.call(state);
          default:
            this.ops.unsupported();
        }
        break;
      default:
        this.ops.unsupported();
    }
    return state;
  }
}

module.exports = OpPage11;
