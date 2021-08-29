import React from 'react';
import styled from 'styled-components';

import Blockly from 'blockly/core';
import locale from 'blockly/msg/en';
import 'blockly/blocks';

Blockly.setLocale(locale);

Blockly.Theme.defineTheme('ag-theme', {
  base: Blockly.Themes.Classic,
  fontStyle: {
    family: 'Lato, sans-serif',
    size: 12,
  },
});

const Section = styled.section`
  position: relative;
  width: 100%;
  min-width: 550px;
  height: ${({ height }) => `${height || 500}px`};
  border: 6px solid #000000;
  box-shadow: 2px 4px 0px #000000;
  border-radius: 10px;
`;

const BlocklyStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  

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

    Blockly.svgResize(this.workspace);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { children, height } = this.props;

    return (
      <Section height={height}>
        <BlocklyStyle ref={this.blockly} />
        <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style={{ display: 'none' }} ref={this.toolbox}>
          {children}
        </xml>
      </Section>
    );
  }
}

export default BlocklyComponent;
