import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Graph from '../Graph';

const GraphCreator = ({ width, height, onGraphChanged }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

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
    // d key
    if (e.keyCode === 68) {
      const selectedNodes = nodes.filter((i) => i.selected);
      setEdges(edges.filter((i) => {
        // remove edges associated with deleted node
        if (selectedNodes.find((n) => n.id === i.from || n.id === i.to)) {
          return false;
        }
        return !i.selected;
      }));
      setNodes(nodes.filter((i) => !i.selected));
    }
    // e key
    if (e.keyCode === 69) {
      setAddEdge(false);
    // n key
    } else if (e.keyCode === 78) {
      setAddNode(false);
    }
  }, [nodes, edges]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.addEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyUp]);

  const edgeClicked = (e) => {
    setEdges(edges.map((i) => {
      if (i.to === e.to && i.from === e.from) {
        return { ...i, selected: true };
      }
      return { ...i, selected: false };
    }));

    setLastNodeSelected(null);
    setNodes(nodes.map((i) => ({ ...i, selected: false })));
  };

  const nodeClicked = (n) => {
    if (addEdge && lastNodeSelected) {
      // if the edge does not yet exist create it
      if (n.id !== lastNodeSelected.id
        && !edges.find((e) => e.from === lastNodeSelected.id && e.to === n.id)) {
        const newEdges = [...edges, { from: lastNodeSelected.id, to: n.id, selected: false }];
        setEdges(newEdges);
        onGraphChanged({ nodes, edges: newEdges });
      }
    } else {
      setEdges(edges.map((i) => ({ ...i, selected: false })));
    }

    setLastNodeSelected(n);
    setNodes(nodes.map((i) => {
      if (i.id === n.id) {
        return { ...i, selected: true };
      }
      return { ...i, selected: false };
    }));
  };

  const canvasClicked = (n) => {
    if (addNode) {
      const newNode = {
        id: `${created}`, x: n.svgX, y: n.svgY, selected: false,
      };
      const newNodes = [
        ...nodes,
        newNode,
      ];

      setCreated(created + 1);
      setNodes(newNodes.map((i) => {
        if (i.id === newNode.id) {
          return { ...i, selected: true };
        }
        return { ...i, selected: false };
      }));
      setLastNodeSelected(newNode);
      onGraphChanged({ nodes: newNodes, edges });
    } else {
      setLastNodeSelected(null);
      setNodes(nodes.map((i) => ({ ...i, selected: false })));
    }

    setEdges(edges.map((i) => ({ ...i, selected: false })));
  };

  return (
    <Graph
      nodes={nodes}
      edges={edges}
      width={width}
      height={height}
      onEdgeClicked={edgeClicked}
      onNodeClicked={nodeClicked}
      onCanvasClicked={canvasClicked}
    />
  );
};

GraphCreator.propTypes = {
  onGraphChanged: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default GraphCreator;
