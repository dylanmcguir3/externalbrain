// pages/graph.js
import React, { useState } from 'react';
import AssumptionNode from '../components/AssumptionNode';
import ResearchNode from '../components/ResearchNode';
import ConversationNode from '../components/ConversationNode';
import { useDrop } from 'react-dnd';
import NodeCreationButton from '../components/NodeCreationButton';

const GraphPage = () => {
  const [, drop] = useDrop({
    accept: ['ASSUMPTION', 'RESEARCH', 'CONVERSATION'],
    drop: (item, monitor) => {

    },
  });

  interface Node {
    id: string;
    type: string;
  }
  
  const [nodes, setNodes] = useState<Node[]>([]);

  const createNode = (nodeType: string) => {
    const newNode = {
      id: `${nodeType.toLowerCase()}-${nodes.length + 1}`,
      type: nodeType.toUpperCase(),
    };
    setNodes(prevNodes => [newNode, ...prevNodes]);
    console.log(nodes);
  };

  return (
    <div className="graph-container">
      <h1>Retail Buyer Platform</h1>
      <NodeCreationButton onCreateNode={createNode} />
      <div ref={drop} className="node-container">
        {nodes.map(node => {
          switch (node.type) {
            case 'ASSUMPTION':
              return <AssumptionNode key={node.id} id={node.id} />;
            case 'CONVERSATION':
              return <ConversationNode key={node.id} id={node.id} />;
            case 'RESEARCH':
              return <ResearchNode key={node.id} id={node.id} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default GraphPage;