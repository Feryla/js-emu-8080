import { mov } from '../src/instructions/dataTransferInstructions';
import { freshState } from '../src/stateUtil';
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
