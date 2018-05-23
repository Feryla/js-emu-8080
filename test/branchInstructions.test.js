import { jmp, call } from '../src/instructions/branchInstructions';
import { freshState, copyState } from '../src/stateUtil';

test('jmp', () => {
  const state = freshState();
  state.registers.pc = 256;
  state.memory[state.registers.pc + 1] = 12;
  state.memory[state.registers.pc + 2] = 0;
  jmp(state);
  expect(state.registers.pc).toBe(12);
});

test('call', () => {
  const state = freshState();
  state.registers.pc = 128;
  state.registers.sp = 256;
  state.memory[state.registers.pc + 1] = 12;
  state.memory[state.registers.pc + 2] = 0;
  const newState = copyState(state);
  call(newState);
  expect(newState.memory[state.registers.sp - 1]).toBe(0);
  expect(newState.memory[state.registers.sp - 2]).toBe(128);
  expect(newState.registers.sp).toBe(state.registers.sp - 2);
  expect(newState.registers.pc).toBe(12);
});
