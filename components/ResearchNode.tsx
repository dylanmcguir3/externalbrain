// components/ResearchNode.tsx
import React, { useState, useEffect } from 'react';
import { useDrag, useDragLayer } from 'react-dnd';

interface ResearchNodeProps {
  id: string;
}

const ResearchNode: React.FC<ResearchNodeProps> = ({ id }) => {
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
    type: 'RESEARCH',
    item: { id },
  });

  const style : {transform: string, position : 'absolute'} = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    position: 'absolute',
  };

  return (
    <div ref={ref} className="node research-node" style={style}>
      Research Node
    </div>
  );
};

export default ResearchNode;