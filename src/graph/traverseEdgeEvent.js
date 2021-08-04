import Event from './event';

export const TYPE = 'traverseEdge';

export class TraverseEdgeEvent extends Event {
  constructor(data, time) {
    super(TYPE, data, time);
  }

  apply(graph) {
    const edge = graph.getEdgeById(this.data.edgeId);
    edge.traversed = true;
    edge.focus();
  }
}
