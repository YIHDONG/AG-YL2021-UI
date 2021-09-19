import React from 'react';
import PropTypes from 'prop-types';

import BlocklyRunner from '../Blockly';

const BlocklyExample = ({ blocks, initialVars, output }) => (
  <BlocklyRunner
    initialVars={initialVars}
    blocks={[]}
    onCodeGenerated={() => {}}
    initialXml={blocks}
    readOnly
    output={output}
    height={200}
  />
);

BlocklyExample.propTypes = {
  blocks: PropTypes.string.isRequired,
  initialVars: PropTypes.shape({}).isRequired,
  output: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlocklyExample;
