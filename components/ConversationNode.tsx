// components/ConversationNode.tsx
import React, { useState, useEffect } from 'react';
import { useDrag, useDragLayer } from 'react-dnd';

interface ConversationNodeProps {
  id: string;
}

const ConversationNode: React.FC<ConversationNodeProps> = ({ id }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const { isDragging, initialSourceClientOffset, sourceClientOffset, item } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
    sourceClientOffset: monitor.getSourceClientOffset(),
    item: monitor.getItem(),
  }));

  useEffect(() => {
    if (isDragging && item && item.id === id) {
      if (initialSourceClientOffset && sourceClientOffset) {
        setPosition({
          x: initialPosition.x + (sourceClientOffset.x - initialSourceClientOffset.x),
          y: initialPosition.y + (sourceClientOffset.y - initialSourceClientOffset.y),
        });
      }
    } else {
      setInitialPosition(position);
    }
  }, [isDragging, initialSourceClientOffset, sourceClientOffset, item]);

  const [, ref] = useDrag({
    type: 'CONVERSATION',
    item: { id },
  });

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`
  };

  return (
    <div ref={ref} className="node conversation-node" style={style}>
      Conversation Node
    </div>
  );
};

export default ConversationNode;