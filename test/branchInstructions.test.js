import { jmp, condJmp, call, condCall } from '../src/instructions/branchInstructions';
import { freshState, copyState } from '../src/stateUtil';

test('jmp', () => {
  const state = freshState();
  state.registers.pc = 256;
  state.memory[state.registers.pc + 1] = 12;
  state.memory[state.registers.pc + 2] = 0;
  jmp(state);
  expect(state.registers.pc).toBe(12);
});

test('condjmp', () => {
  const state = freshState();
  state.registers.pc = 256;
  state.conditionFlags.z = 1;
  state.memory[state.registers.pc + 1] = 12;
  state.memory[state.registers.pc + 2] = 0;
  condJmp(state, 0b001); // pattern for z == 1
  expect(state.registers.pc).toBe(12);
});

test('condjmp, condition not valid', () => {
  const state = freshState();
  state.registers.pc = 256;
  state.conditionFlags.z = 1;
  state.memory[state.registers.pc + 1] = 12;
  state.memory[state.registers.pc + 2] = 0;
  condJmp(state, 0b000); // pattern for z == 0
  expect(state.registers.pc).toBe(257);
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

test('condcall', () => {
  const state = freshState();
  state.registers.pc = 128;
  state.registers.sp = 256;
  state.memory[state.registers.pc + 1] = 12;
  state.memory[state.registers.pc + 2] = 0;
  state.conditionFlags.z = 1;
  const newState = copyState(state);
  condCall(newState, 0b001); // pattern for z == 1
  expect(newState.memory[state.registers.sp - 1]).toBe(0);
  expect(newState.memory[state.registers.sp - 2]).toBe(128);
  expect(newState.registers.sp).toBe(state.registers.sp - 2);
  expect(newState.registers.pc).toBe(12);
});

test('condcall', () => {
  const state = freshState();
  state.registers.pc = 128;
  state.registers.sp = 256;
  state.memory[state.registers.pc + 1] = 12;
  state.memory[state.registers.pc + 2] = 0;
  state.conditionFlags.z = 1;
  const newState = copyState(state);
  condCall(newState, 0b000); // pattern for z == 0
  expect(newState.registers.pc).toBe(129);
});
