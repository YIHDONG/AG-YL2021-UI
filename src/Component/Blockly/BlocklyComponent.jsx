import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Blockly from 'blockly/core';
import locale from 'blockly/msg/en';
import 'blockly/blocks';

Blockly.setLocale(locale);

const BlocklyStyle = styled.div`
  height: 500px;
  width: 700px;
`;

// eslint-disable-next-line react/prop-types
const BlocklyComponent = ({ initialXml, children, ...rest }) => {
  const blocklyRef = useRef(null);
  const toolboxRef = useRef(null);
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    if (!workspace && blocklyRef.current && toolboxRef.current) {
      setWorkspace(Blockly.inject(
        blocklyRef.current,
        {
          toolbox: toolboxRef.current,
          ...rest,
        },
      ));
    }

    if (workspace && initialXml) {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), workspace);
    }
  }, [blocklyRef, toolboxRef, workspace, initialXml, rest]);

  return (
    <>
      <BlocklyStyle ref={blocklyRef} id="blocklyDiv" />
      <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style={{ display: 'none' }} ref={toolboxRef}>
        {children}
      </xml>
    </>
  );
};

export default BlocklyComponent;
