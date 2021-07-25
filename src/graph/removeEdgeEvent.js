const Event = require('./event');

const TYPE = 'removeEdge';

class RemoveEdgeEvent extends Event {
  constructor(data, time) {
    super(TYPE, data, time);
  }

  apply(graph) {
    graph.getEdgeById(this.data.edgeId);
    // eslint-disable-next-line no-param-reassign
    graph.edges = graph.edges.filter((e) => e.id !== this.data.edgeId);
  }
}

module.exports = {
  RemoveEdgeEvent,
  TYPE,
};
