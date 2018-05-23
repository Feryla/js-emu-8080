const stateUtil = require('../src/stateUtil');
const ops = require('../src/operations');

test('nop increases pc by one', () => {
  const state = stateUtil.freshState();
  const newState = ops.nop(state);
  expect(newState.registers.pc).toBe(state.registers.pc + 1);
});
