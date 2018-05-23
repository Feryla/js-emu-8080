/**
 * This group of instructions transfers data to and from registers and memory. Condition flags are not affected by any instruction in this group.
 */
import {
  getRegisterKey,
  hl,
  incrementPcAndCycles,
  getRpKeyLow,
  getRpKeyHigh
} from './instructionUtils';

export const mov = (state, dest, source) => {
  let cycles = 0;
  if (dest === 0b110) {
    // to memory
    const sourceKey = getRegisterKey(source);
    state.memory[hl(state)] = state.registers[sourceKey];
    cycles = 2;
  } else if (source === 0b110) {
    // from memory
    const destKey = getRegisterKey(dest);
    state.registers[destKey] = state.memory[hl(state)];
    cycles = 2;
  } else {
    // between registers
    const detstKey = getRegisterKey(dest);
    const sourceKey = getRegisterKey(source);
    state.registers[detstKey] = state.registers[sourceKey];
    cycles = 1;
  }
  incrementPcAndCycles(state, 1, cycles);
};

export const mvi = (state, dest) => {
  let cycles = 2;
  const val = state.memory[state.registers.pc + 1];
  if (dest === 0b110) {
    // to memory
    state.memory[hl(state)] = val;
    cycles = 3;
  } else {
    const detstKey = getRegisterKey(dest);
    state.registers[detstKey] = val;
  }
  incrementPcAndCycles(state, 2, cycles);
};

export const lxi = (state, rp) => {
  const low = state.memory[state.registers.pc + 1];
  const high = state.memory[state.registers.pc + 2];
  if (rp === 0b11) {
    state.registers.sp = (high << 8) | low;
  } else {
    state.registers[getRpKeyLow(rp)] = low;
    state.registers[getRpKeyHigh(rp)] = high;
  }
  incrementPcAndCycles(state, 3, 3);
};

export const lda = state => {
  const low = state.memory[state.registers.pc + 1];
  const high = state.memory[state.registers.pc + 2];
  state.registers.a = state.memory[(high << 8) | low];
  incrementPcAndCycles(state, 3, 4);
};

export const sta = state => {
  const low = state.memory[state.registers.pc + 1];
  const high = state.memory[state.registers.pc + 2];
  state.memory[(high << 8) | low] = state.registers.a;
  incrementPcAndCycles(state, 3, 4);
};

export const lhld = state => {
  const low = state.memory[state.registers.pc + 1];
  const high = state.memory[state.registers.pc + 2];
  const addr = (high << 8) | low;
  state.registers.l = state.memory[addr];
  state.registers.h = state.memory[addr + 1];
  incrementPcAndCycles(state, 3, 5);
};

export const shld = state => {
  const low = state.memory[state.registers.pc + 1];
  const high = state.memory[state.registers.pc + 2];
  const addr = (high << 8) | low;
  state.memory[addr] = state.registers.l;
  state.memory[addr + 1] = state.registers.h;
  incrementPcAndCycles(state, 3, 5);
};

export const ldax = (state, rp) => {
  const addr = (state.registers[getRpKeyHigh(rp)] << 8) | state.registers[getRpKeyLow(rp)];
  state.registers.a = state.memory[addr];
  incrementPcAndCycles(state, 1, 2);
};

export const stax = (state, rp) => {
  const addr = (state.registers[getRpKeyHigh(rp)] << 8) | state.registers[getRpKeyLow(rp)];
  state.memory[addr] = state.registers.a;
  incrementPcAndCycles(state, 1, 2);
};

export const xchg = state => {
  const { h, l } = state.registers;
  state.registers.h = state.registers.d;
  state.registers.l = state.registers.e;
  state.registers.d = h;
  state.registers.e = l;
  incrementPcAndCycles(state, 1, 1);
};
