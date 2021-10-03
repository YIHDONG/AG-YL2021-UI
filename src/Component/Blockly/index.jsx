import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BlocklyJS from 'blockly/javascript';

import ButtonLoud from '../Buttons/ButtonLoud';
import BlocklyComponent from './BlocklyComponent';
import StaticGraphGraphic from '../Graph/StaticGraphGraphic';
import Modal from '../Modal';
import './customBlocks';
import GraphAnimatorComponent from '../GraphAnimator';
import execute from './utils';
import constants from '../../constants';

const Workspace = styled.div`
  color: white;
`;

const ModalContainer = styled.div`
  position: absolute;
  z-index: 100000;
`;

const CodeControl = styled.div`
  margin: 20px 0px;
`;

const ConsoleLog = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: left;
  margin: 10px;

  color: ${constants.color.textBasic};
`;

const Output = styled.div`
  min-height: 30px;
  background:white;
  border: 6px solid black;
  box-shadow: 4px 4px 0px black;
  border-radius: 10px;
`;

const Block = (p) => {
  const { children, ...props } = p;
  props.is = 'blockly';
  return React.createElement('block', props, children);
};

const Category = (p) => {
  const { children, ...props } = p;
  props.is = 'blockly';
  return React.createElement('category', props, children);
};

const Value = (p) => {
  const { children, ...props } = p;
  props.is = 'blockly';
  return React.createElement('value', props, children);
};

const Field = (p) => {
  const { children, ...props } = p;
  props.is = 'blockly';
  return React.createElement('field', props, children);
};

const Shadow = (p) => {
  const { children, ...props } = p;
  props.is = 'blockly';
  return React.createElement('shadow', props, children);
};

const BlocklyRunner = ({
  initialVars,
  blocks,
  onCodeGenerated,
  initialXml,
  readOnly,
  output,
  displayInModal,
  height,
}) => {
  const workspaceRef = useRef(null);
  const [executedOutput, setExecutedOutput] = useState(null);
  const [executionError, setExecutionError] = useState(null);

  const getOutput = (def, { initial, executed }) => {
    switch (def.type) {
      case 'value':
        return executed.variables[def.name];
      case 'graph':
        return (
          <StaticGraphGraphic
            width={executed.variables[def.name].width}
            height={executed.variables[def.name].height}
            nodes={executed.variables[def.name].nodes}
            edges={executed.variables[def.name].edges}
          />
        );
      case 'graphAnimation':
        return (
          <GraphAnimatorComponent
            initialGraph={initial.variables[def.name]}
            events={executed.variables[def.name].events}
          />
        );
      case 'console':
        return executed.console.map((v) => <ConsoleLog>{`>>> ${v}`}</ConsoleLog>);
      default:
        throw new Error(`no component registered for output type ${def.type}`);
    }
  };

  const run = () => {
    const code = BlocklyJS.workspaceToCode(
      workspaceRef.current.workspace,
    );
    console.log(code);
    onCodeGenerated(code);

    let results;
    try {
      results = execute(initialVars, code);
    } catch (e) {
      setExecutionError(e.message || e);
    }

    if (!results) return;
    setExecutedOutput(getOutput(output, results));
  };

  return (
    <>
      <Workspace>
        <BlocklyComponent
          ref={workspaceRef}
          readOnly={readOnly}
          initialXml={initialXml}
          trashcan={!readOnly}
          move={{
            scrollbars: !readOnly,
            drag: !readOnly,
            wheel: !readOnly,
          }}
          height={height}
        >
          {blocks.map((b) => <Block key={b.name} type={b.name} />)}
        </BlocklyComponent>
        <CodeControl>
          <ButtonLoud onClick={run}>Run</ButtonLoud>
        </CodeControl>
      </Workspace>
      {!displayInModal && executedOutput ? <Output>{executedOutput}</Output> : null}
      <ModalContainer>
        <Modal title="Execution" showModal={executedOutput !== null && displayInModal} closeModal={() => setExecutedOutput(null)}>
          {executedOutput}
        </Modal>
        <Modal title="Woops!!" showModal={executionError !== null} closeModal={() => setExecutionError(null)} status="incorrect">
          {`Looks like there was an issue with that code, we tried to run it but there were some errors: ${executionError}`}
        </Modal>
      </ModalContainer>
    </>
  );
};

BlocklyRunner.propTypes = {
  initialVars: PropTypes.shape({}).isRequired,
  onCodeGenerated: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  blocks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  initialXml: PropTypes.string,
  displayInModal: PropTypes.bool,
  output: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  height: PropTypes.number,
};

BlocklyRunner.defaultProps = {
  readOnly: false,
  initialXml: null,
  displayInModal: false,
  height: null,
};

export default BlocklyRunner;
export {
  Block,
  Value,
  Category,
  Field,
  Shadow,
};
