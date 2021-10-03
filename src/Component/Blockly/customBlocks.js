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
  id: 'while_do',
  definition: {
    message0: 'while %1',
    args0: [
      { type: 'input_value', name: 'WHILE_STATEMENT' },
    ],
    message1: 'do %1',
    args1: [
      { type: 'input_statement', name: 'DO' },
    ],
    previousStatement: null,
    nextStatement: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const statement = Blockly.JavaScript.statementToCode(block, 'DO') || '';
    const condition = Blockly.JavaScript.statementToCode(block, 'WHILE_STATEMENT') || 'false';
    return `while (${condition}) {${statement}};\n`;
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
  },
  style: 'loop_blocks',
  generator: (block) => {
    const one = Blockly.JavaScript.statementToCode(block, 'ONE') || '';
    const other = Blockly.JavaScript.statementToCode(block, 'OTHER') || '';
    return `${one} === ${other}`;
  },
});

registerCustom({
  id: 'number_of',
  definition: {
    message0: 'number of %1',
    args0: [
      { type: 'input_value', name: 'SET' },
    ],
    output: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const set = Blockly.JavaScript.statementToCode(block, 'SET') || [];
    return `Arrays.isArray(${set})?${set}.length:${set}.size`;
  },
});

registerCustom({
  id: 'neighbors_of_x',
  definition: {
    message0: 'neighbors of %1',
    args0: [
      { type: 'field_input', name: 'NODE' },
    ],
  }
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
  },
  style: 'loop_blocks',
  generator: (block) => {
    const from = Blockly.JavaScript.statementToCode(block, 'FROM') || null;
    const to = Blockly.JavaScript.statementToCode(block, 'TO') || null;
    return `execution.variables.graph.edges.find((e) -> e.fromNode === ${from} && e.toNode === ${to}`;
  },
});

registerCustom({
  id: 'is_not_block',
  definition: {
    message0: '%1 is not %2',
    args0: [
      { type: 'input_value', name: 'ELEM_1' },
      { type: 'input_value', name: 'ELEM_2' },
    ],
  },
  style: 'loop_blocks',
  generator: (block) => {
    const elem1 = Blockly.JavaScript.statementToCode(block, 'ELEM_1') || null;
    const elem2 = block.getFieldValue('ELEM_2') || null;
    return `${elem1}!==(${elem2})`;
  },
});

registerCustom({
  id: 'less_than',
  definition: {
    message0: '%1 is less than %2',
    args0: [
      { type: 'input_value', name: 'ELEM_1', check: 'Number' },
      { type: 'input_value', name: 'ELEM_2', check: 'Number' },
    ],
    inputsInline: true,
    output: 'Boolean',
  },
  style: 'logic_blocks',
  generator: (block) => {
    const firstVar = Blockly.JavaScript.statementToCode(block, 'ELEM_1') || null;
    const secondVar = Blockly.JavaScript.statementToCode(block, 'ELEM_2') || null;
    return `${firstVar} < ${secondVar}`;
  },
});

registerCustom({
  id: 'greater_than',
  definition: {
    message0: '%1 is greater than %2',
    args0: [
      { type: 'input_value', name: 'ELEM_1', check: 'Number' },
      { type: 'input_value', name: 'ELEM_2', check: 'Number' },
    ],
    inputsInline: true,
    output: 'Boolean',
  },
  style: 'logic_blocks',
  generator: (block) => {
    const firstVar = Blockly.JavaScript.statementToCode(block, 'ELEM_1') || null;
    const secondVar = Blockly.JavaScript.statementToCode(block, 'ELEM_2') || null;
    return `${firstVar} > ${secondVar}`;
  },
});

registerCustom({
  id: 'set_to',
  definition: {
    message0: 'set %1 to %2',
    args0: [
      { type: 'input_value', name: 'VAR' },
      { type: 'input_value', name: 'VALUE' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const variable = Blockly.JavaScript.statementToCode(block, 'VAR') || null;
    const value = Blockly.JavaScript.statementToCode(block, 'VALUE') || null;
    return `${variable} = ${value}`;
  },
});

registerCustom({
  id: 'print_var',
  definition: {
    message0: 'print %1',
    args0: [
      { type: 'input_value', name: 'VARIABLE' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
  },
  style: 'text_blocks',
  generator: (block) => {
    const variable = Blockly.JavaScript.statementToCode(block, 'VARIABLE') || null;
    return `execution.console.push('${variable}')`;
  },
});

registerCustom({
  id: 'edge_weight',
  definition: {
    message0: 'edge weight of %1',
    args0: [
      { type: 'input_value', name: 'EDGE' },
    ],
    inputsInline: true,
    output: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const edgeVar = Blockly.JavaScript.statementToCode(block, 'EDGE') || 'edge';
    return `${edgeVar}.getWeight();\n`;
  },
});

registerCustom({
  id: 'distance_from_to',
  definition: {
    message0: 'distance from %1 to %2',
    args0: [
      { type: 'input_value', name: 'NODE_1' },
      { type: 'input_value', name: 'NODE_2' },
    ],
    inputsInline: true,
    output: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const srcNodeVar = Blockly.JavaScript.statementToCode(block, 'NODE_1') || 'node';
    const destNodeVar = Blockly.JavaScript.statementToCode(block, 'NODE_2') || 'node';
    return `${srcNodeVar}.getDistance()[${destNodeVar}.getId()];\n`;
  },
});

registerCustom({
  id: 'math_number',
  definition: {
    message0: '%1',
    args0: [
      { type: 'field_number', name: 'NUM', value: 0 },
    ],
    inputsInline: true,
    output: 'Number',
  },
  style: 'math_blocks',
  generator: (block) => {
    const number = block.getFieldValue('NUM') || '';
    return `${number}`;
  },
});
