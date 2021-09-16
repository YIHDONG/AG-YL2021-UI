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
  id: 'is_block',
  definition: {
    message0: '%1 is %2',
    args0: [
      { type: 'input_value', name: 'ELEM_1' },
      { type: 'field_input', name: 'ELEM_2' },
    ],
    output: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const elem1 = Blockly.JavaScript.statementToCode(block, 'ELEM_1') || null;
    const elem2 = block.getFieldValue('ELEM_2') || null;
    return `${elem1}===(${elem2})`;
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
    return `!${elem1}===(${elem2})`;
  },
});
