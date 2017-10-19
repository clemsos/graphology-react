import React from 'react';
import ReactDOM from 'react-dom';

import {UndirectedGraph} from 'graphology';
import erdosRenyi from 'graphology-generators/random/erdos-renyi';
import randomLayout from 'graphology-layout/random';
import chroma from 'chroma-js';
import faker from 'faker';

import Graph from '../src/Graph.jsx'

const graph = erdosRenyi(UndirectedGraph, {n: 100, probability: 0.2});
randomLayout.assign(graph);

graph.nodes().forEach(node => {
  const attr = graph.getNodeAttributes(node);

  graph.mergeNodeAttributes(node, {
    label: faker.name.findName(),
    size: Math.max(4, Math.random() * 10),
    color: chroma.random().hex()
  });
});

graph.edges().forEach(edge => {
  graph.setEdgeAttribute(edge, 'color', '#ccc');
});

const App = ({graph}) => (
  <Graph
    graph={graph}
    width={700}
    height={700}
    />
)

ReactDOM.render(<App graph={graph} />, document.getElementById('container'));
