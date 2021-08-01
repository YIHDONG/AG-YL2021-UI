import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BlocklyJS from 'blockly/javascript';
import * as Blockly from 'blockly/core';

import ButtonLoud from '../Buttons/ButtonLoud';
import BlocklyComponent, {
  Block, Value, Field, Shadow,
} from '../Blockly';

Blockly.Theme.defineTheme('ag-theme', {
  base: Blockly.Themes.Classic,
  fontStyle: {
    family: 'Lato, sans-serif',
    size: 12,
  },
});

const forEachNodeBlockDef = {
  type: 'for_each_graph_elem_in_graph',
  message0: 'for each %1 %2 in %3',
  args0: [
    {
      type: 'field_dropdown',
      name: 'GRAPH_ELEM',
      options: [
        ['node', 'nodes'],
        ['edge', 'edges'],
      ],
    },
    { type: 'field_input', name: 'VAR_NAME' },
    { type: 'input_value', name: 'GRAPH' },
  ],
  message1: 'do %1',
  args1: [
    { type: 'input_statement', name: 'DO' },
  ],
};

Blockly.Blocks.for_each_graph_elem_in_graph = {
  init() {
    this.jsonInit(forEachNodeBlockDef);
    this.setStyle('loop_blocks');
  },
};

Blockly.JavaScript.for_each_graph_elem_in_graph = (block) => {
  const graph = Blockly.JavaScript.statementToCode(block, 'GRAPH') || 'graph';
  const graphElem = block.getFieldValue('GRAPH_ELEM') || 'node';
  const nodeVar = block.getFieldValue('VAR_NAME') || 'node';
  const statement = Blockly.JavaScript.statementToCode(block, 'DO') || '';
  return `${graph}.${graphElem}.forEach((${nodeVar}) => {\n${statement}\n});\n`;
};

const graphBlockDef = {
  type: 'graph',
  message0: 'graph',
  output: null,
};

Blockly.Blocks.graph = {
  init() {
    this.jsonInit(graphBlockDef);
    this.setStyle('loop_blocks');
  },
};

Blockly.JavaScript.graph = () => 'graph';

const visitNode = {
  type: 'visit_node',
  message0: 'visit node %1 in %2',
  args0: [
    { type: 'field_input', name: 'VAR_NAME' },
    { type: 'input_value', name: 'GRAPH' },
  ],
  previousStatement: null,
  nextStatement: null,
};

Blockly.Blocks.visit_node = {
  init() {
    this.jsonInit(visitNode);
    this.setStyle('loop_blocks');
  },
};

Blockly.JavaScript.visit_node = (block) => {
  const graph = Blockly.JavaScript.statementToCode(block, 'GRAPH') || 'graph';
  const nodeVar = block.getFieldValue('VAR_NAME') || 'node';
  return `${graph}.visitNode(${nodeVar}.id);\n`;
};

const Workspace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const BlocklyProblem = ({ onSubmissionDataChange }) => {
  const workspaceRef = useRef(null);

  const generateCode = () => {
    const code = BlocklyJS.workspaceToCode(
      workspaceRef.current.workspace,
    );
    console.log(code);
    onSubmissionDataChange({ code });
  };

  return (
    <Workspace>
      <ButtonLoud onClick={generateCode}>Convert</ButtonLoud>
      <BlocklyComponent
        ref={workspaceRef}
        readOnly={false}
        trashcan
        move={{
          scrollbars: true,
          drag: true,
          wheel: true,
        }}
      >
        <Block type="for_each_graph_elem_in_graph" />
        <Block type="graph" />
        <Block type="visit_node" />
        <Block type="controls_repeat_ext">
          <Value name="TIMES">
            <Shadow type="math_number">
              <Field name="NUM">10</Field>
            </Shadow>
          </Value>
        </Block>
      </BlocklyComponent>
    </Workspace>
  );
};

BlocklyProblem.propTypes = {
  onSubmissionDataChange: PropTypes.func.isRequired,
};

export default BlocklyProblem;
