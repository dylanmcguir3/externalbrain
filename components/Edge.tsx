import React, { use, useEffect, useState } from 'react';

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
  const [graphStart, setGraphStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const graph = document.getElementById('graph');
    if (!graph) {
      return;
    }
    const graphRect = graph.getBoundingClientRect();
    setGraphStart({ x: graphRect.left, y: graphRect.top });
  }, []);

  useEffect(() => {
    const sourceRect = document.getElementById(source.id)?.getBoundingClientRect();
    const targetRect = document.getElementById(target.id)?.getBoundingClientRect();
    if (!sourceRect || !targetRect) {
      return;
    }
    setSourcePos({ x: sourceRect.left, y: sourceRect.top});
    setTargetPos({ x: targetRect.left, y: targetRect.top});
    setSourceWidth(sourceRect.width);
    setSourceHeight(sourceRect.height);
    setTargetWidth(targetRect.width);
    setTargetHeight(targetRect.height);
  });


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
        x1={sourcePos.x + sourceWidth / 2 - graphStart.x}
        y1={sourcePos.y + sourceHeight / 2 - graphStart.y} 
        x2={targetPos.x + targetWidth / 2 - graphStart.x}
        y2={targetPos.y + targetHeight / 2  - graphStart.y}
        stroke="black" 
        strokeWidth="2"
      />
    </svg>
  );
};

export default Edge;