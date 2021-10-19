import * as uuid from 'uuid';

class Node {
  constructor(name, x, y, graph) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.id = uuid.v4();
    this.edges = [];
    this.visited = false;
    this.graph = graph;
    this.focused = false;
    this.distance = {};
  }

  visit() {
    this.graph.visitNode(this.id);
  }

  focus() {
    this.graph.clearFocus();
    this.focused = true;
  }

  clearFocus() {
    this.focused = false;
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  removeEdge(edgeId) {
    this.edges = this.edges.filter((e) => e.id !== edgeId);
  }

  getPathsFrom() {
    return this.edges.filter((e) => e.fromNode.id === this.id);
  }

  getPathsTo() {
    return this.edges.filter((e) => e.toNode.id === this.id);
  }

  getNeighbors() {
    return this.edges.reduce((acc, e) => {
      let neighbor;
      if (e.toNode.id !== this.id) {
        neighbor = e.toNode;
      } else {
        return acc;
      }
      const inList = acc.find((a) => a.id === neighbor.id);
      if (!inList) {
        acc.push(neighbor);
      }
      return acc;
    }, []);
  }

  getDistance() {
    return this.distance;
  }

  getId() {
    return this.id;
  }
}

export default Node;
