import * as Blockly from 'blockly/core';

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
  message0: 'visit node %1',
  args0: [
    { type: 'field_input', name: 'VAR_NAME' },
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
  const nodeVar = block.getFieldValue('VAR_NAME') || 'node';
  return `${nodeVar}.visit();\n`;
};

const traverseEdge = {
  type: 'traverse_edge',
  message0: 'traverse edge %1',
  args0: [
    { type: 'field_input', name: 'VAR_NAME' },
  ],
  previousStatement: null,
  nextStatement: null,
};

Blockly.Blocks.traverse_edge = {
  init() {
    this.jsonInit(traverseEdge);
    this.setStyle('loop_blocks');
  },
};

Blockly.JavaScript.traverse_edge = (block) => {
  const edgeVar = block.getFieldValue('VAR_NAME') || 'edge';
  return `${edgeVar}.traverse();\n`;
};
