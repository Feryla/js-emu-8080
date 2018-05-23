/**
 * This group of instructions performs I/O, manipulates the Stack, and alters internal control flags.
 */

import * as utils from './instructionUtils';

export const nop = state => {
  utils.incrementPcAndCycles(state, 1, 1);
};

export const dummy = state => state;
