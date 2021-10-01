import * as Blockly from 'blockly/core';

const registerCustom = ({
  id, definition, generator, style,
}) => {
  Blockly.Blocks[id] = {
    init() {
      this.jsonInit({ ...definition, type: id });
      this.setStyle(style);
    },
  };
  Blockly.JavaScript[id] = generator;
};

registerCustom({
  id: 'for_each_graph_elem_in_graph',
  definition: {
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
  },
  style: 'loop_blocks',
  generator: (block) => {
    const graph = Blockly.JavaScript.statementToCode(block, 'GRAPH') || 'graph';
    const graphElem = block.getFieldValue('GRAPH_ELEM') || 'node';
    const nodeVar = block.getFieldValue('VAR_NAME') || 'node';
    const statement = Blockly.JavaScript.statementToCode(block, 'DO') || '';
    return `${graph}.${graphElem}.forEach((${nodeVar}) => {\n${statement}\n});\n`;
  },
});

registerCustom({
  id: 'graph',
  definition: {
    message0: 'graph',
    output: null,
  },
  style: 'loop_blocks',
  generator: () => 'execution.variables.graph',
});

registerCustom({
  id: 'visit_node',
  definition: {
    message0: 'visit node %1',
    args0: [
      { type: 'field_input', name: 'VAR_NAME' },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const nodeVar = block.getFieldValue('VAR_NAME') || 'node';
    return `${nodeVar}.visit();\n`;
  },
});

registerCustom({
  id: 'traverse_edge',
  definition: {
    message0: 'traverse edge %1',
    args0: [
      { type: 'field_input', name: 'VAR_NAME' },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const edgeVar = block.getFieldValue('VAR_NAME') || 'edge';
    return `${edgeVar}.traverse();\n`;
  },
});

registerCustom({
  id: 'print_message',
  definition: {
    message0: 'print %1',
    args0: [
      { type: 'field_input', name: 'VAR_NAME' },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const value = block.getFieldValue('VAR_NAME') || '';
    return `execution.console.push(${value})`;
  },
});

registerCustom({
  id: 'x_is_in_xs',
  definition: {
    message0: '%1 is in %2',
    args0: [
      { type: 'field_input', name: 'ITEM' },
      { type: 'field_input', name: 'ITEMS' },
    ],
    output: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const item = Blockly.JavaScript.statementToCode(block, 'ITEM') || '';
    const items = Blockly.JavaScript.statementToCode(block, 'ITEMS') || [];
    return `${items}.filter((i) => i == ${item}).length != 0`;
  },
});

registerCustom({
  id: 'x_is_y',
  definition: {
    message0: '%1 is %2',
    args0: [
      { type: 'field_input', name: 'ONE' },
      { type: 'field_input', name: 'OTHER' },
    ],
    output: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const one = Blockly.JavaScript.statementToCode(block, 'ONE') || '';
    const other = Blockly.JavaScript.statementToCode(block, 'OTHER') || '';
    return `${one} === ${other}`;
  },
});

registerCustom({
  id: 'neighbors_of_x',
  definition: {
    message0: 'neighbors of %1',
    args0: [
      { type: 'field_input', name: 'NODE' },
    ],
    output: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const one = Blockly.JavaScript.statementToCode(block, 'NODE') || '';
    return `${one}.edges.map((e) => e.toNode).filter((e) => e === ${one})`;
  },
});

registerCustom({
  id: 'visited_nodes',
  definition: {
    message0: 'visited nodes',
    output: null,
  },
  style: 'loop_blocks',
  generator: () => 'execution.variables.graph.nodes.filter((n) => n.visited)',
});

registerCustom({
  id: 'unvisited_nodes',
  definition: {
    message0: 'unvisited nodes',
    output: null,
  },
  style: 'loop_blocks',
  generator: () => 'execution.variables.graph.nodes.filter((n) => !n.visited)',
});

registerCustom({
  id: 'nodes',
  definition: {
    message0: 'nodes',
    output: null,
  },
  style: 'loop_blocks',
  generator: () => 'execution.variables.graph.nodes',
});

registerCustom({
  id: 'edges',
  definition: {
    message0: 'edges',
  },
  style: 'loop_blocks',
  generator: () => 'execution.variables.graph.edges',
});

registerCustom({
  id: 'edge_from_x_to_y',
  definition: {
    message0: 'edge from %1 to %2',
    args0: [
      { type: 'input_value', name: 'FROM' },
      { type: 'input_value', name: 'TO' },
    ],
    inputsInline: true,
    output: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const from = Blockly.JavaScript.statementToCode(block, 'FROM') || null;
    const to = Blockly.JavaScript.statementToCode(block, 'TO') || null;
    return `execution.variables.graph.edges.find((e) -> e.fromNode === ${from} && e.toNode === ${to}`;
  },
});
