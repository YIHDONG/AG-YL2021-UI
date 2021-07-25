import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GraphComponent from '../Graph';
import Graph from '../../graph/graph';

const Editor = styled.div`
  margin: 20px;

  ul {
    margin: 0;
    padding: 0;
  }
`;

const Instructions = styled.li`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  text-align: left;
  color: #2B1953;
  margin: 4px;
  max-width: 400px;
  text-align: justify;
`;

const Node = styled.strong`
  color: #C900CD;
`;

const Edge = styled.strong`
  color: #1ABA00;
`;

const GraphCreator = ({ width, height, onGraphChanged }) => {
  const [graph, setGraph] = useState(new Graph());

  const [addNode, setAddNode] = useState(false);
  const [addEdge, setAddEdge] = useState(false);
  const [created, setCreated] = useState(0);
  const [lastNodeSelected, setLastNodeSelected] = useState(null);

  const handleKeyDown = (e) => {
    // e key
    if (e.keyCode === 69) {
      setAddEdge(true);
    // n key
    } else if (e.keyCode === 78) {
      setAddNode(true);
    }
  };

  const handleKeyUp = useCallback((e) => {
    const newGraph = graph.copy();
    // d key
    if (e.keyCode === 68) {
      newGraph.edges.filter((i) => i.selected).forEach((i) => newGraph.removeEdge(i.id));
      newGraph.nodes.filter((i) => i.selected).forEach((i) => newGraph.removeNode(i.id));
    }
    // e key
    if (e.keyCode === 69) {
      setAddEdge(false);
    // n key
    } else if (e.keyCode === 78) {
      setAddNode(false);
    }

    setGraph(newGraph);
  }, [graph]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.addEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyUp]);

  const edgeClicked = (e) => {
    const newGraph = graph.copy();
    newGraph.edges.forEach((i) => {
      // eslint-disable-next-line no-param-reassign
      i.selected = i.id === e.id;
    });

    newGraph.nodes.forEach((i) => {
      // eslint-disable-next-line no-param-reassign
      i.selected = false;
    });

    setLastNodeSelected(null);
    setGraph(newGraph);
  };

  const nodeClicked = (n) => {
    const newGraph = graph.copy();
    if (addEdge && lastNodeSelected) {
      // if the edge does not yet exist create it
      if (n.id !== lastNodeSelected.id
        && !newGraph.hasEdge(lastNodeSelected.id, n.id)) {
        newGraph.addEdge(lastNodeSelected.id, n.id, `(${lastNodeSelected.name}, ${n.name})`, 1);
        onGraphChanged({ graph: newGraph });
      }
    } else {
      newGraph.edges.forEach((i) => {
        // eslint-disable-next-line no-param-reassign
        i.selected = false;
      });
    }

    setLastNodeSelected(n);
    newGraph.nodes.forEach((i) => {
      // eslint-disable-next-line no-param-reassign
      i.selected = i.id === n.id;
    });
    setGraph(newGraph);
  };

  const canvasClicked = (n) => {
    const newGraph = graph.copy();
    if (addNode) {
      newGraph.addNode(`${created}`, n.svgX, n.svgY);
      const newNode = newGraph.nodes[newGraph.nodes.length - 1];
      setCreated(created + 1);
      newGraph.nodes.forEach((i) => {
        // eslint-disable-next-line no-param-reassign
        i.selected = i.id === newNode.id;
      });
      setLastNodeSelected(newNode);
      onGraphChanged({ graph: newGraph });
    } else {
      setLastNodeSelected(null);
      newGraph.nodes.forEach((i) => {
        // eslint-disable-next-line no-param-reassign
        i.selected = false;
      });
    }

    newGraph.edges.forEach((i) => {
      // eslint-disable-next-line no-param-reassign
      i.selected = false;
    });
    setGraph(newGraph);
  };

  return (
    <Editor>
      <GraphComponent
        nodes={graph.nodes}
        edges={graph.edges.map((e) => ({ ...e, fromNodeId: e.fromNode.id, toNodeId: e.toNode.id }))}
        width={width}
        height={height}
        onEdgeClicked={edgeClicked}
        onNodeClicked={nodeClicked}
        onCanvasClicked={canvasClicked}
      />
      <ul>
        <Instructions>
          To add a
          {' '}
          <Node>node</Node>
          :
          {' '}
          press and hold
          {' '}
          <em>n</em>
          {' '}
          and click on the space above
        </Instructions>
        <Instructions>
          To add an
          {' '}
          <Edge>edge</Edge>
          :
          {' '}
          select a
          {' '}
          <Node>node</Node>
          , press and hold
          {' '}
          <em>e</em>
          {' '}
          and then select a second
          {' '}
          <Node>node</Node>
        </Instructions>
        <Instructions>
          To remove a
          {' '}
          <Node>node</Node>
          {' '}
          or
          {' '}
          <Edge>edge</Edge>
          :
          {' '}
          select the element and press
          {' '}
          <em>d</em>
        </Instructions>
      </ul>
    </Editor>
  );
};

GraphCreator.propTypes = {
  onGraphChanged: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default GraphCreator;
