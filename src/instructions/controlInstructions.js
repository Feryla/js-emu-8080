/**
 * This group of instructions performs I/O, manipulates the Stack, and alters internal control flags.
 */

import * as utils from './instructionUtils';

export const nop = state => {
  utils.incrementPc(state, 1);
};

export const dummy = state => {
  return state;
};
