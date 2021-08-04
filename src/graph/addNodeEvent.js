import Node from './node';
import Event from './event';

export const TYPE = 'addNode';

export class AddNodeEvent extends Event {
  constructor(data, time) {
    super(TYPE, data, time);
  }

  apply(graph) {
    const node = new Node(this.data.name, this.data.x, this.data.y, graph);
    graph.nodes.push(node);
    // eslint-disable-next-line no-param-reassign
    graph.currentNode = graph.currentNode || node;
    node.focus();
  }
}
