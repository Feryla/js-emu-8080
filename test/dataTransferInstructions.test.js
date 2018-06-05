import {
  mov,
  mvi,
  lxi,
  lda,
  sta,
  lhld,
  shld,
  ldax,
  stax,
  xchg
} from '../src/instructions/dataTransferInstructions';
import { freshState, copyState } from '../src/stateUtil';
import { getPatternForRegisterKey, hl } from '../src/instructions/instructionUtils';

test('mov from register a to register b', () => {
  const val = 123;
  const state = freshState();
  state.registers.a = val;
  mov(state, getPatternForRegisterKey('b'), getPatternForRegisterKey('a'));
  expect(state.registers.b).toBe(val);
  expect(state.registers.pc).toBe(1);
});

test('mov from register a to memory', () => {
  const val = 123;
  const state = freshState();
  state.registers.a = val;
  state.registers.h = 1;
  mov(state, 0b110, getPatternForRegisterKey('a'));
  expect(state.memory[hl(state)]).toBe(val);
  expect(state.registers.pc).toBe(1);
});

test('mov from memory to register a', () => {
  const val = 123;
  const state = freshState();
  state.registers.h = 1;
  state.memory[hl(state)] = val;
  mov(state, getPatternForRegisterKey('a'), 0b110);
  expect(state.registers.a).toBe(val);
  expect(state.registers.pc).toBe(1);
});

test('mvi to register a', () => {
  const val = 123;
  const state = freshState();
  state.registers.pc = 256;
  state.memory[state.registers.pc + 1] = val;
  const newState = copyState(state);
  mvi(newState, getPatternForRegisterKey('a'));
  expect(state.registers.a).toBe(0);
  expect(newState.registers.a).toBe(val);
  expect(newState.registers.pc).toBe(state.registers.pc + 2);
});

test('mvi to memory', () => {
  const val = 123;
  const state = freshState();
  state.registers.pc = 128;
  state.memory[state.registers.pc + 1] = val;
  state.registers.h = 1;
  const newState = copyState(state);
  mvi(newState, 0b110);
  expect(state.memory[hl(newState)]).toBe(0);
  expect(newState.memory[hl(newState)]).toBe(val);
  expect(newState.registers.pc).toBe(state.registers.pc + 2);
});

test('lxi bc', () => {
  const state = freshState();
  state.memory[state.registers.pc + 1] = 128;
  state.memory[state.registers.pc + 2] = 1;
  lxi(state, 0b00);
  expect(state.registers.b).toBe(1);
  expect(state.registers.c).toBe(128);
});

test('lxi sp', () => {
  const state = freshState();
  state.memory[state.registers.pc + 1] = 128;
  state.memory[state.registers.pc + 2] = 1;
  lxi(state, 0b11);
  expect(state.registers.sp).toBe(384);
});

test('lda', () => {
  const val = 123;
  const state = freshState();
  state.memory[1] = 128;
  state.memory[2] = 1;
  state.memory[384] = val;
  lda(state);
  expect(state.registers.a).toBe(val);
});

test('sta', () => {
  const val = 123;
  const state = freshState();
  state.memory[1] = 128;
  state.memory[2] = 1;
  state.registers.a = val;
  sta(state);
  expect(state.memory[384]).toBe(val);
});

test('lhld', () => {
  const v1 = 123;
  const v2 = 234;
  const state = freshState();
  state.memory[1] = 128;
  state.memory[128] = v1;
  state.memory[128 + 1] = v2;
  lhld(state);
  expect(state.registers.l).toBe(v1);
  expect(state.registers.h).toBe(v2);
});

test('shld', () => {
  const v1 = 123;
  const v2 = 234;
  const state = freshState();
  state.memory[1] = 128;
  state.registers.l = v1;
  state.registers.h = v2;
  state.memory[128 + 1] = v2;
  shld(state);
  expect(state.memory[128]).toBe(v1);
  expect(state.memory[128 + 1]).toBe(v2);
});

test('ldax', () => {
  const val = 123;
  const state = freshState();
  state.registers.d = 1;
  state.registers.e = 128;
  state.memory[384] = val;
  ldax(state, 0b01);
  expect(state.registers.a).toBe(val);
});

test('stax', () => {
  const val = 123;
  const state = freshState();
  state.registers.h = 1;
  state.registers.l = 128;
  state.registers.a = val;
  stax(state, 0b10);
  expect(state.memory[384]).toBe(val);
});

test('xchg', () => {
  const state = freshState();
  state.registers.d = 1;
  state.registers.e = 2;
  state.registers.h = 3;
  state.registers.l = 4;
  xchg(state);
  expect(state.registers.h).toBe(1);
  expect(state.registers.l).toBe(2);
  expect(state.registers.d).toBe(3);
  expect(state.registers.e).toBe(4);
});
