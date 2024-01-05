// pages/graph.js
import React from 'react';
import AssumptionNode from '../components/AssumptionNode';
import ResearchNode from '../components/ResearchNode';
import ConversationNode from '../components/ConversationNode';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const GraphPage = () => {
  const [, drop] = useDrop({
    accept: ['ASSUMPTION', 'RESEARCH', 'CONVERSATION'],
    drop: (item, monitor) => {

    },
  });

  return (
    <div className="graph-container">
      <h1>Retail Buyer Platform</h1>
        <div ref={drop} className="node-container">
          <AssumptionNode id="assumption-1" />
          <ConversationNode id="conversation-1" />
          <ConversationNode id="conversation-2" />
          <ResearchNode id="research-1" />
          <ResearchNode id="research-2" />
        </div>
    </div>
  );
};

export default GraphPage;