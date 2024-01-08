import React from 'react';

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
  const [sourceWidth, sourceHeight] = getNodeDimensions(source);
  const [targetWidth, targetHeight] = getNodeDimensions(target);

  return (
    <svg width={width} height={height}>
      <line 
        x1={source.x + sourceWidth / 2}
        y1={source.y + sourceHeight / 2} 
        x2={target.x + targetWidth / 2}
        y2={target.y + targetHeight / 2}
        stroke="black" 
      />
    </svg>
  );
};

export default Edge;