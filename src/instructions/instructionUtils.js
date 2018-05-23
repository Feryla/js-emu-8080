export const incrementPc = (state, incr) => {
  state.registers.pc += incr;
};

export const hl = state => ((0x00 | state.registers.h) << 8) | state.registers.l;

export const getRegisterKey = pattern => {
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
};

export const getPatternForRegisterKey = key => {
  switch (key) {
    case 'a':
      return 0b111;
    case 'b':
      return 0b000;
    case 'c':
      return 0b001;
    case 'd':
      return 0b010;
    case 'e':
      return 0b011;
    case 'h':
      return 0b100;
    case 'l':
      return 0b101;
    default:
      throw new Error('Invalid register key');
  }
};
