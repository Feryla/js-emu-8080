import * as ops from '../src/instructions/controlInstructions';
import { freshState, copyState } from '../src/stateUtil';

test('nop increases pc by one', () => {
  const state = freshState();
  const newState = copyState(state);
  ops.nop(newState);
  expect(newState.registers.pc).toBe(state.registers.pc + 1);
});
