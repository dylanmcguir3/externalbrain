import { useDrag, useDragLayer } from 'react-dnd';
import { useState, useEffect } from 'react';

interface NodeProps {
  id: string;
  initial_x: number;
  initial_y: number;
  type: string;
}

const Node: React.FC<NodeProps> = ({ id, initial_x, initial_y, type }) => {
  const [position, setPosition] = useState({ x: initial_x, y: initial_y});
  const [initialPosition, setInitialPosition] = useState({ x: initial_x, y: initial_y });
  const [isEditing, setIsEditing] = useState(false);
  const [nodeText, setNodeText] = useState('Node');

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeText(event.target.value);
  };

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
    type: 'ASSUMPTION', // vestigial
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
    <div onDoubleClick={handleDoubleClick}>
    {isEditing ? (
    <div ref={ref} className={`node ${type}-node`} style={style}>
      <input className="input" type="text" value={nodeText} onChange={handleChange} onBlur={handleBlur} autoFocus />
    </div>
    ) : (
      <div ref={ref} className={`node ${type}-node`} style={style}>
        {nodeText}
      </div>
    )}
    </div>
  );
};

export default Node;