import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BlocklyJS from 'blockly/javascript';
import * as Blockly from 'blockly/core';

import ButtonLoud from '../Buttons/ButtonLoud';
import BlocklyComponent, { Block } from '../Blockly';
import Modal from '../Modal';
import GraphAnimator from '../GraphAnimator';
import Graph from '../../graph/graph';
import Node from '../../graph/node';

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

Blockly.JavaScript.graph = () => 'executedGraph';

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

const ModalContainer = styled.div`
  position: absolute;
  z-index: 100;
`;

const BlocklyProblem = ({ initalGraph, onSubmissionDataChange }) => {
  const workspaceRef = useRef(null);
  const [execution, setExecution] = useState(null);
  const [executionError, setExecutionError] = useState(null);

  const executeOnGraph = (graph, code) => {
    const executedGraph = graph.copy();
    // eslint-disable-next-line no-eval
    eval(code);
    return executedGraph;
  };

  const run = () => {
    const g = new Graph();
    const node = new Node('a', 200, 200, g);
    g.nodes = [node];
    try {
      const code = BlocklyJS.workspaceToCode(
        workspaceRef.current.workspace,
      );
      setExecution(executeOnGraph(g, code));
      onSubmissionDataChange({ code });
    } catch (e) {
      setExecutionError(e.message || e);
    }
  };

  return (
    <>
      <Workspace>
        <ButtonLoud onClick={run}>Run</ButtonLoud>
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
        </BlocklyComponent>
      </Workspace>
      <ModalContainer>
        <Modal title="Execution" showModal={execution !== null} closeModal={() => setExecution(null)}>
          <GraphAnimator
            initialGraph={{
              nodes: (execution && execution.nodes) || [],
              edges: (execution && execution.edges) || [],
              width: 400,
              height: 400,
            }}
            events={(execution && execution.events) || []}
          />
        </Modal>
        <Modal title="Woops!!" showModal={executionError !== null} closeModal={() => setExecutionError(null)} status="incorrect">
          {executionError}
        </Modal>
      </ModalContainer>
    </>
  );
};

BlocklyProblem.propTypes = {
  onSubmissionDataChange: PropTypes.func.isRequired,
  initialGraph: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

export default BlocklyProblem;
