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
      { type: 'field_variable', name: 'VAR', variable: 'default' },
      { type: 'input_value', name: 'VALUE' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const variable = block.getFieldValue('VAR') || null;
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
  },
  style: 'loop_blocks',
  generator: (block) => {
    const edgeVar = Blockly.JavaScript.statementToCode(block, 'EDGE') || 'edge';
    return `${edgeVar}.getWeight();\n`;
  },
});

registerCustom({
  id: 'variable',
  definition: {
    message0: '%1',
    args0: [
      { type: 'field_variable', name: 'VAR', variable: 'default' },
    ],
    inputsInline: true,
    output: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const variable = block.getField('VAR').getValue() || '';
    return `${variable}`;
  },
});

registerCustom({
  id: 'text',
  definition: {
    message0: '%1',
    args0: [
      { type: 'field_input', name: 'TEXT', value: '' },
    ],
    inputsInline: true,
    output: 'String',
  },
  style: 'text_blocks',
  generator: (block) => {
    const text = block.getFieldValue('TEXT') || '';
    return `${text}`;
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

registerCustom({
  id: 'math_constant',
  definition: {
    message0: '%1',
    args0: [
      { type: 'field_label_serializable', name: 'CONSTANT', text: 'infinity' },
    ],
    inputsInline: true,
    output: 'String',
  },
  style: 'math_blocks',
  generator: (block) => {
    const constant = block.getFieldValue('CONSTANT') || '';
    return `${constant}`;
  },
});

registerCustom({
  id: 'if_do',
  definition: {
    message0: 'if %1 do %2',
    args0: [
      { type: 'input_value', name: 'CONDITION', check: 'Boolean' },
      { type: 'input_statement', name: 'STATEMENT' },
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
  },
  style: 'loop_blocks',
  generator: (block) => {
    const condition = Blockly.JavaScript.statementToCode(block, 'CONDITION') || null;
    const statement = Blockly.JavaScript.statementToCode(block, 'STATEMENT') || null;
    return `if (${condition}) {${statement}};\n`;
  },
});
