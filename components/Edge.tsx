import React, { useEffect, useState } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
}

interface EdgeProps {
  source: Node,
  target: Node
}

const Edge: React.FC<EdgeProps> = ({ source, target }) => {

  const [sourcePos, setSourcePos] = useState({ x: source.x, y: source.y });
  const [targetPos, setTargetPos] = useState({ x: target.x, y: target.y });
  const [sourceWidth, setSourceWidth] = useState(0);
  const [sourceHeight, setSourceHeight] = useState(0);
  const [targetWidth, setTargetWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [canvasStart, setCanvasStart] = useState({ x: 0, y: 142 });



  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (!canvas) {
      return;
    }
    const canvasRect = canvas.getBoundingClientRect();
    setCanvasStart({ x: canvasRect.left, y: canvasRect.top });
    const updatePositions = () => {
      const sourceNode = document.getElementById(source.id);
      const targetNode = document.getElementById(target.id);
      console.log(sourceNode);
      if (!sourceNode || !targetNode) {
        return;
      }
      
      const sourceRect = sourceNode.getBoundingClientRect();
      const targetRect = targetNode.getBoundingClientRect();
      setSourcePos({ x: sourceRect.left, y: sourceRect.top - canvasStart.y });
      setTargetPos({ x: targetRect.left, y: targetRect.top - canvasStart.y });
      setSourceWidth(sourceRect.width);
      setSourceHeight(sourceRect.height);
      setTargetWidth(targetRect.width);
      setTargetHeight(targetRect.height);
      console.log(sourceRect, sourceRect.height);
    };
  
    const observer = new MutationObserver(updatePositions);
    observer.observe(document, { childList: true, subtree: true });
  
    // Listen for the custom event
    const handleNodeMove = () => {
      updatePositions();
    };
    document.addEventListener('nodeMove', handleNodeMove);
  
    return () => {
      observer.disconnect();
      document.removeEventListener('nodeMove', handleNodeMove);
    };
  }, [source, target]);

  const getCanvasDimensions = (): number[] => {
    // Add your code here

    const canvas = document.getElementById('canvas');
    if (!canvas) {
      return [1000, 1000];
    }
    const style = window.getComputedStyle(canvas);
    const width = style.getPropertyValue('width');
    const height = style.getPropertyValue('height');
    return [parseInt(width), parseInt(height)];
  }

  const getNodeDimensions = (node : Node): number[] => {
    const nodeElement = document.getElementById(node.id);
    if (!nodeElement) {
      return [150, 75];
    }
    const style = window.getComputedStyle(nodeElement);
    const width = style.getPropertyValue('width');
    const height = style.getPropertyValue('height');
    return [parseInt(width), parseInt(height)];
  }

  const [width, height] = getCanvasDimensions();

  return (
    <svg width={width * 2} height={height} className='edge'>
      <line 
        className='edge'
        x1={sourcePos.x + sourceWidth / 2 }
        y1={sourcePos.y + sourceHeight / 2} 
        x2={targetPos.x + targetWidth / 2}
        y2={targetPos.y + targetHeight / 2}
        stroke="black" 
        strokeWidth="2"
      />
    </svg>
  );
};

export default Edge;