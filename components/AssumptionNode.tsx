import { useDrag, useDragLayer } from 'react-dnd';
import { useState, useEffect } from 'react';
import { Position } from 'postcss';

interface AssumptionNodeProps {
  id: string;
}

const AssumptionNode: React.FC<AssumptionNodeProps> = ({ id }) => {
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
      console.log(initialPosition, position)
      setInitialPosition(position);
    }
  }, [isDragging, initialSourceClientOffset, sourceClientOffset]);

  const [, ref] = useDrag({
    type: 'ASSUMPTION',
    item: { id },
  });

  const style : {transform: string, position : 'absolute'} = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    position: 'absolute',
  };

  return (
    <div ref={ref} className="node assumption-node" style={style}>
      Assumption Node
    </div>
  );
};

export default AssumptionNode;