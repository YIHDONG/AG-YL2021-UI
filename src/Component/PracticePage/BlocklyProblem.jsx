import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BlocklyJS from 'blockly/javascript';

import ButtonLoud from '../Buttons/ButtonLoud';
import BlocklyComponent, { Block } from '../Blockly';
import Modal from '../Modal';
import GraphAnimator from '../GraphAnimator';
import * as Graph from '../../graph/graph';

const Workspace = styled.div`
  color: white;
`;

const ModalContainer = styled.div`
  position: absolute;
  z-index: 100;
`;

const CodeControl = styled.div`
  margin: 20px 0px;
`;

const BlocklyProblem = ({ initialGraph, blocks, onSubmissionDataChange }) => {
  const workspaceRef = useRef(null);
  const [execution, setExecution] = useState(null);
  const [executionError, setExecutionError] = useState(null);

  const executeOnGraph = (graph, code) => {
    const executedGraph = graph;
    // eslint-disable-next-line no-eval
    eval(code);
    return executedGraph;
  };

  const run = () => {
    const g = new Graph();
    g.init(initialGraph.nodes, initialGraph.edges);
    try {
      const code = BlocklyJS.workspaceToCode(
        workspaceRef.current.workspace,
      );
      setExecution(executeOnGraph(g, code));
      onSubmissionDataChange({ type: 'code', data: { code } });
    } catch (e) {
      setExecutionError(e.message || e);
    }
  };

  return (
    <>
      <Workspace>
        <BlocklyComponent
          ref={workspaceRef}
          readOnly={false}
          trashcan
          move={{
            scrollbars: true,
            drag: true,
            wheel: true,
          }}
        >
          {blocks.map((b) => <Block key={b.name} type={b.name} />)}
        </BlocklyComponent>
        <CodeControl>
          <ButtonLoud onClick={run}>Run</ButtonLoud>
        </CodeControl>
      </Workspace>
      <ModalContainer>
        <Modal title="Execution" showModal={execution !== null} closeModal={() => setExecution(null)}>
          <GraphAnimator
            initialGraph={{
              nodes: (execution && execution.nodes) || [],
              edges: (execution && execution.edges) || [],
              width: 400,
              height: 400,
            }}
            events={(execution && execution.events) || []}
          />
        </Modal>
        <Modal title="Woops!!" showModal={executionError !== null} closeModal={() => setExecutionError(null)} status="incorrect">
          {`Looks like there was an issue with your code, we tried to run it but there were some errors: ${executionError}`}
        </Modal>
      </ModalContainer>
    </>
  );
};

BlocklyProblem.propTypes = {
  onSubmissionDataChange: PropTypes.func.isRequired,
  initialGraph: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    nodes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })),
    edges: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      fromNodeId: PropTypes.string.isRequired,
      toNodeId: PropTypes.string.isRequired,
    })),
  }).isRequired,
  blocks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default BlocklyProblem;
