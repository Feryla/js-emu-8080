const fresh = {
  memory: new Uint8Array(65536),
  registers: {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    h: 0,
    l: 0,
    pc: 0,
    sp: 0
  },
  conditionFlags: {
    z: 0,
    s: 0,
    p: 0,
    cy: 0,
    ac: 0
  },
  cycles: 0
};

export const copyState = state =>
  Object.assign({}, state, {
    memory: state.memory.slice(),
    registers: Object.assign({}, state.registers),
    conditionFlags: Object.assign({}, state.conditionFlags)
  });

export const freshState = () => {
  const state = copyState(fresh);
  for (let i = 0; i < state.memory.length; i += 1) {
    state.memory[i] = 0;
  }
  return state;
};
