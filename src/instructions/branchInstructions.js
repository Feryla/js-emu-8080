export const jmp = state => {
  const low = state.memory[state.registers.pc + 1];
  const high = state.memory[state.registers.pc + 2];
  state.registers.pc = (high << 8) | low;
  state.cycles += 3;
};

export const call = state => {
  state.memory[state.registers.sp - 1] = state.registers.pc >> 8;
  state.memory[state.registers.sp - 2] = state.registers.pc & 0b11111111;
  state.registers.sp -= 2;
  state.cycles += 2;
  jmp(state);
};
