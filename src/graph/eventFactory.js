import * as addEdgeEvent from './addEdgeEvent';
import * as addNodeEvent from './addNodeEvent';
import * as removeEdgeEvent from './removeEdgeEvent';
import * as removeNodeEvent from './removeNodeEvent';
import * as visitNodeEvent from './visitNodeEvent';
import * as traverseEdgeEvent from './traverseEdgeEvent';

const make = (event) => {
  const time = event.time || new Date();
  switch (event.type) {
    case addNodeEvent.TYPE:
      return new addNodeEvent.AddNodeEvent(event.data, time);
    case addEdgeEvent.TYPE:
      return new addEdgeEvent.AddEdgeEvent(event.data, time);
    case visitNodeEvent.TYPE:
      return new visitNodeEvent.VisitNodeEvent(event.data, time);
    case traverseEdgeEvent.TYPE:
      return new traverseEdgeEvent.TraverseEdgeEvent(event.data, time);
    case removeEdgeEvent.TYPE:
      return new removeEdgeEvent.RemoveEdgeEvent(event.data, time);
    case removeNodeEvent.TYPE:
      return new removeNodeEvent.RemoveNodeEvent(event.data, time);
    default:
      throw new Error(`unknown event type ${event.type}`);
  }
};

export default make;
