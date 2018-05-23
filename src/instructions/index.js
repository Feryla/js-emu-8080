import * as control from './controlInstructions';
import * as dataTransfer from './dataTransferInstructions';

const unsupported = () => {
  throw new Error('Unsupported op');
};

export default { unsupported, ...control, ...dataTransfer };
