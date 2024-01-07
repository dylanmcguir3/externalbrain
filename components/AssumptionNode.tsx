import { useDrag, useDragLayer } from 'react-dnd';
import { useState, useEffect } from 'react';

interface AssumptionNodeProps {
  id: string;
  initial_x: number;
  initial_y: number;
}

const AssumptionNode: React.FC<AssumptionNodeProps> = ({ id, initial_x, initial_y }) => {
  const [position, setPosition] = useState({ x: initial_x, y: initial_y});
  const [initialPosition, setInitialPosition] = useState({ x: initial_x, y: initial_y });

  const { isDragging, initialSourceClientOffset, sourceClientOffset, item } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
    sourceClientOffset: monitor.getSourceClientOffset(),
    item: monitor.getItem(),
  }));

  useEffect(() => {
    if (isDragging && item && item.id === id) {
      if (initialSourceClientOffset && sourceClientOffset) {
        const newPosition = {
          x: initialPosition.x + (sourceClientOffset.x - initialSourceClientOffset.x),
          y: initialPosition.y + (sourceClientOffset.y - initialSourceClientOffset.y),
        };
        setPosition(newPosition);

        }
    } else {
      setInitialPosition(position);
    }
  }, [isDragging, initialSourceClientOffset, sourceClientOffset]);

  const [, ref] = useDrag({
    type: 'ASSUMPTION',
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
  
      if (item && monitor.didDrop() && sourceClientOffset && initialSourceClientOffset) {
        const newPosition = {
          x: initialPosition.x + (sourceClientOffset.x - initialSourceClientOffset.x),
          y: initialPosition.y + (sourceClientOffset.y - initialSourceClientOffset.y),
        };
  
        const newNode = {
          id: id,
          type: 'ASSUMPTION',
          x: newPosition.x,
          y: newPosition.y,
        };
  
        // Update the node's position in the database
        fetch('/api/updateNode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNode),
        });
      }
    },
  });
  const style : {transform: string, position : 'absolute'} = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    position: 'absolute',
  };

  return (
    <div ref={ref} className="node assumption-node" style={style}>
      Node
    </div>
  );
};

export default AssumptionNode;