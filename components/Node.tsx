import { useDrag, useDragLayer } from 'react-dnd';
import { useState, useEffect } from 'react';

interface NodeProps {
  id: string;
  initial_x: number;
  initial_y: number;
  type: string;
  text: string;
}

const Node: React.FC<NodeProps> = ({ id, initial_x, initial_y, type, text }) => {
  const [position, setPosition] = useState({ x: initial_x, y: initial_y});
  const [initialPosition, setInitialPosition] = useState({ x: initial_x, y: initial_y });
  const [isEditing, setIsEditing] = useState(false);
  const [nodeText, setNodeText] = useState(text);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    pushChange();
  };

const pushChange = () => {
  const newNode = {
    id: id,
    type: type,
    x: position.x,
    y: position.y,
    text : nodeText,
  };
  fetch('/api/updateNode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNode),
  });

  const event = new CustomEvent('nodeMove');
  document.dispatchEvent(event);
  
}
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
        const containerWidth = 800; // replace with actual container width
        const containerHeight = 600; // replace with actual container height
        const nodeWidth = 100; // replace with actual node width
        const nodeHeight = 100; // replace with actual node height
  
        let newX = initialPosition.x + (sourceClientOffset.x - initialSourceClientOffset.x);
        let newY = initialPosition.y + (sourceClientOffset.y - initialSourceClientOffset.y);
  
        // Ensure the new position is within the bounds of the container
        newX = Math.min(Math.max(newX, 0), containerWidth - nodeWidth);
        newY = Math.min(Math.max(newY, 0), containerHeight - nodeHeight);
  
        setPosition({ x: newX, y: newY });
      }
    } else {
      setInitialPosition(position);
    }
  }, [isDragging, initialSourceClientOffset, sourceClientOffset, isEditing]);

  const [, ref] = useDrag({
    type: 'ASSUMPTION', // vestigial
    item: { id , type},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
  
      if (item && monitor.didDrop() && sourceClientOffset && initialSourceClientOffset) {
        pushChange();

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
    <div id={id} ref={ref} className={`node ${type}-node`} style={style}>
      <input className="input" type="text" value={nodeText} onChange={handleChange} onBlur={handleBlur} autoFocus />
    </div>
    ) : (
      <div id={id} ref={ref} className={`node ${type}-node`} style={style}>
        {nodeText}
      </div>
    )}
    </div>
  );
};

export default Node;