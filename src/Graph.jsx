import React from 'react';
import ReactDOM from 'react-dom';

const Node = ({x, y, label, size, color}) => (
  <g
    className="node"
    transform={`translate(${x},${y})`}
    >
    <circle
      cx={-10}
      cy={-5}
      r={size}
      fill={color}
      />
    <text>{label}</text>
  </g>
)

const Nodes = ({graph}) => (
  <g className="nodes">
    {
      graph.nodes().map(n =>
        <Node {...graph.getNodeAttributes(n)} key={n}/>
      )
    }
  </g>
)

const Edge = ({source, target, color}) => (
  <line
    className="edge"
    x1={source.x} y1={source.y}
    x2={target.x} y2={target.y}
    style={{stroke: color, strokeWidth:1}}
  />
)

const Edges = ({graph}) => (
  <g className="edges">
    {
      graph.edges().map(e => {
        const source = graph.getNodeAttributes(graph.source(e));
        const target = graph.getNodeAttributes(graph.target(e));
        return <Edge
          key={e}
          {...graph.getEdgeAttributes(e)}
          source={source}
          target={target}
        />
      })
    }
  </g>
)

const Graph = ({
  graph,
  width,
  height,
  margin=100
}) => {

  graph.nodes().forEach(node => {
    const attr = graph.getNodeAttributes(node);
    graph.mergeNodeAttributes(node, {
      x: attr.x*(width-margin/2),
      y: attr.y*(height-margin/2)
    });
  })

  return (
    <svg width={width} height={height} transform={`translate(${margin/2},${margin/2})`}>
      <Edges graph={graph} />
      <Nodes graph={graph} />
    </svg>
  )
}

export default Graph
