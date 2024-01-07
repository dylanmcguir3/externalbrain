// pages/graph.js
import React, { useEffect, useState } from 'react';
import Node from '../components/Node';
import { useDrop } from 'react-dnd';
import NodeCreationButton from '../components/NodeCreationButton';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const GraphPage = () => {
  const [, drop] = useDrop({
    accept: ['ASSUMPTION', 'RESEARCH', 'CONVERSATION'],
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
      }));
      setNodes(formattedNodes);
    };
  
    fetchNodes();
  }, []);

  interface Node {
    id: string;
    type: string;
    x: number;
    y: number;
  }
  
  const [nodes, setNodes] = useState<Node[]>([]);

  const createNode = (nodeType: string) => {
    const newNode = {
      id: `${nodeType.toLowerCase()}-${nodes.length + 1}`,
      type: nodeType.toUpperCase(),
      x : 0,
      y : 0,
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

  return (
    <div className="graph-container">
      <h1>Retail Buyer Platform</h1>
      <NodeCreationButton onCreateNode={createNode} />
      <div ref={drop} className="node-container">
        {nodes.map(node => {
          switch (node.type) {
            case 'ASSUMPTION':
              return <Node key={node.id} id={node.id} initial_x={node.x} initial_y={node.y} type={"assumption"}/>;
            case 'CONVERSATION':
              return <Node key={node.id} id={node.id} initial_x={node.x} initial_y={node.y} type={"conversation"} />;
            case 'RESEARCH':
              return <Node key={node.id} id={node.id} initial_x={node.x} initial_y={node.y} type={"research"}/>;
            default:
              return <Node key={node.id} id={node.id} initial_x={node.x} initial_y={node.y} type={""}/>;
          }
        })}
      </div>
    </div>
  );
};

export default GraphPage;