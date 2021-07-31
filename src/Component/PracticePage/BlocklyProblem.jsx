import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BlocklyJS from 'blockly/javascript';
import * as Blockly from 'blockly/core';

import ButtonLoud from '../Buttons/ButtonLoud';
import BlocklyComponent, {
  Block, Value, Field, Shadow,
} from '../Blockly';

Blockly.Themes.Dark = Blockly.Theme.defineTheme('ag-theme', {
  base: Blockly.Themes.Classic,
  fontStyle: {
    family: 'Lato, sans-serif',
    size: 12,
  },
});

Blockly.JavaScript.test_react_field = () => 'console.log(\'custom block\');\n';

Blockly.JavaScript.test_react_date_field = (block) => `console.log(${block.getField('DATE').getText()});\n`;

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
        media="media/"
        move={{
          scrollbars: true,
          drag: true,
          wheel: true,
        }}
        initialXml={`
<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="controls_ifelse" x="0" y="0"></block>
</xml>
      `}
      >
        <Block type="controls_ifelse" />
        <Block type="logic_compare" />
        <Block type="logic_operation" />
        <Block type="controls_repeat_ext">
          <Value name="TIMES">
            <Shadow type="math_number">
              <Field name="NUM">10</Field>
            </Shadow>
          </Value>
        </Block>
        <Block type="logic_operation" />
        <Block type="logic_negate" />
        <Block type="logic_boolean" />
        <Block type="logic_null" disabled="true" />
        <Block type="logic_ternary" />
        <Block type="text_charAt">
          <Value name="VALUE">
            <Block type="variables_get">
              <Field name="VAR">text</Field>
            </Block>
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
