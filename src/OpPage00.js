const OpPage = require('./OpPage');

class OpPage00 extends OpPage {
  processOp(state, y, z) {
    switch (z) {
      case 0b000:
        return this.ops.nop(state);
      case 0b001:
        return this.ops.lxi(state, y >> 1);
      case 0b010:
        switch (y) {
          case 0b111:
            return this.ops.lda(state);
          case 0b110:
            return this.ops.sta(state);
          case 0b101:
            return this.ops.lhld(state);
          case 0b100:
            return this.ops.shld(state);
          case 0b011:
          case 0b001:
            return this.ops.ldax(state, y >> 1);
          case 0b000:
          case 0b010:
            return this.ops.stax(state, y >> 1);
          default:
            this.ops.unsupported();
        }
        break;
      case 0b110:
        return this.ops.mvi(state, y);
      default:
        this.ops.unsupported();
    }
    return state;
  }
}

module.exports = OpPage00;
