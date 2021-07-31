import React from 'react';
import styled from 'styled-components';

import Blockly from 'blockly/core';
import locale from 'blockly/msg/en';
import 'blockly/blocks';

Blockly.setLocale(locale);

const BlocklyStyle = styled.div`
  width: 700px;
  height: 500px;
  border: 6px solid #000000;
  box-sizing: border-box;
  box-shadow: 2px 4px 0px #000000;
  border-radius: 10px;

  div {
    border-radius: 4px;
  }
`;

class BlocklyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.blockly = React.createRef();
    this.toolbox = React.createRef();
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { initialXml, children, ...rest } = this.props;
    this.workspace = Blockly.inject(
      this.blockly.current,
      {
        toolbox: this.toolbox.current,
        ...rest,
        theme: 'ag-theme',
      },
    );

    if (initialXml) {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), this.workspace);
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;

    return (
      <>
        <BlocklyStyle ref={this.blockly} />
        <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style={{ display: 'none' }} ref={this.toolbox}>
          {children}
        </xml>
      </>
    );
  }
}

export default BlocklyComponent;
