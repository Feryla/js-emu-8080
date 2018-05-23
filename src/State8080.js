class State8080 {
  constructor(state) {
    if (!state) {
      this.a = 0;
      this.b = 0;
      this.c = 0;
      this.d = 0;
      this.e = 0;
      this.h = 0;
      this.l = 0;
      this.sp = 0;
      this.pc = 0;
      this.memory = new Uint8Array(65536);
    } else {
      Object.assign(this, state);
    }
  }

  getValue(pattern) {
    if (pattern === 0b110) {
      return this.memory[this.hl()];
    }
    return this[State8080.getRegisterKey(pattern)];
  }

  setValue(pattern, val) {
    if (pattern === 0b110) {
      this.memory[this.hl()] = val;
    } else {
      this[State8080.getRegisterKey(pattern)] = val;
    }
  }

  hl() {
    return ((0x00 | this.h) << 8) | this.l;
  }

  static getRegisterKey(pattern) {
    switch (pattern) {
      case 0b111:
        return 'a';
      case 0b000:
        return 'b';
      case 0b001:
        return 'c';
      case 0b010:
        return 'd';
      case 0b011:
        return 'e';
      case 0b100:
        return 'h';
      case 0b101:
        return 'l';
      default:
        throw new Error('Invalid register pattern');
    }
  }

  static getRpKeyLow(pattern) {
    switch (pattern) {
      case 0b00:
        return 'c';
      case 0b01:
        return 'e';
      case 0b10:
        return 'l';
      default:
        throw new Error('Invalid RP pattern');
    }
  }

  static getRpKeyHigh(pattern) {
    switch (pattern) {
      case 0b00:
        return 'b';
      case 0b01:
        return 'd';
      case 0b10:
        return 'h';
      default:
        throw new Error('Invalid RP pattern');
    }
  }
}

module.exports = State8080;
