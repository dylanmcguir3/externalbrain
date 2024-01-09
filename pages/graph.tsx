// pages/graph.js
import React, { useEffect, useState } from 'react';
import Node from '../components/Node';
import Edge from '../components/Edge'
import { useDrop } from 'react-dnd';
import NodeCreationButton from '../components/NodeCreationButton';
import ClearNodesButton from '../components/ClearNodesButton';

const GraphPage = () => {

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);


  const [, drop] = useDrop({
    accept: ['node'],
    drop: (item, monitor) => {

    },
  });

  useEffect(() => {
    const fetchNodes = async () => {
      const res = await fetch('/api/nodes');
      const nodes = await res.json();
      // Ensure nodes have x and y properties
      const formattedNodes = nodes.map((node: Node) => ({
        ...node,
        x: node.x || 0,
        y: node.y || 0,
        nodeText : node.text || "Node",
      }));
      setNodes(formattedNodes);
      // createEdge(nodes[0], nodes[1]);
      // createEdge(nodes[0], nodes[2]);
      // createEdge(nodes[0], nodes[3]);
      // createEdge(nodes[2], nodes[1]);
      // createEdge(nodes[3], nodes[4]);
      // createEdge(nodes[4], nodes[5]);
      // createEdge(nodes[5], nodes[6]);
    };
    fetchNodes();
  }, []);

  interface Node {
    id: string;
    type: string;
    x: number;
    y: number;
    text : string;
  }

  interface Edge {
    source: Node;
    target: Node;
  }

  const createNode = (nodeType: string) => {
    const newNode = {
      id: `${nodeType.toLowerCase()}-${nodes.length + 1}`,
      type: nodeType.toUpperCase(),
      x : 0,
      y : 0,
      text : "Node",
    };
    fetch('/api/updateNode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNode),
    });
    setNodes(prevNodes => [newNode, ...prevNodes]);
  };

  const createEdge = (source : Node, target : Node) => {
    setEdges(prevEdges => [...prevEdges, { source, target }]);
  };
  

  return (
    <div id="canvas" className="graph-container">
      <h1>Retail Buyer Platform</h1>
      <NodeCreationButton onCreateNode={createNode} />
      <ClearNodesButton />
      <div id="graph" ref={drop} className="node-container">
        {nodes.map(node => {
          return <Node key={node.id} id={node.id} initial_x={node.x} initial_y={node.y} type={node.type.toLowerCase()} text={node.text}/>;
        })}
        {edges.map((edge, index) => (
          <Edge key={index} source={edge.source} target={edge.target} />
        ))}
      </div>
    </div>
  );
};

export default GraphPage;