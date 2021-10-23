import Graph from '../../graph/graph';

const buildGraph = (graph) => {
  const g = new Graph();
  g.init(graph.nodes, graph.edges);
  return g;
};

const getVar = (def) => {
  switch (def.type) {
    case 'simple':
      return def.value;
    case 'graph':
      return buildGraph(def.value);
    default:
      throw new Error(`error initializing input for unknown variable type ${def.type}`);
  }
};

const generateVars = (initialVars) => ({
  variables: Object.keys(initialVars)
    .reduce((acc, curr) => {
      acc[curr] = getVar(initialVars[curr]);
      return acc;
    }, {}),
  console: [],
});

const execute = (initialVars, code) => {
  const execution = generateVars(initialVars);
  // eslint-disable-next-line no-eval
  eval(code);
  return { initial: generateVars(initialVars), executed: execution };
};

export default execute;
