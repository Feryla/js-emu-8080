/**
 * This group of instructions transfers data to and from registers and memory. Condition flags are not affected by any instruction in this group.
 */
import { getRegisterKey, hl, incrementPc } from './instructionUtils';

export const mov = (state, dest, source) => {
  if (dest === 0b110) {
    // to memory
    const sourceKey = getRegisterKey(source);
    state.memory[hl(state)] = state.registers[sourceKey];
  } else if (source === 0b110) {
    // from memory
    const destKey = getRegisterKey(dest);
    state.registers[destKey] = state.memory[hl(state)];
  } else {
    // between registers
    const detstKey = getRegisterKey(dest);
    const sourceKey = getRegisterKey(source);
    state.registers[detstKey] = state.registers[sourceKey];
  }
  incrementPc(state, 1);
};

export const mvi = (state, dest) => {
  const val = state.memory[state.registers.pc + 1];
  if (dest === 0b110) {
    // to memory
    state.memory[hl(state)] = val;
  } else {
    const detstKey = getRegisterKey(dest);
    state.registers[detstKey] = val;
  }
  incrementPc(state, 2);
};
