import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from  '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface NodeCreationButtonProps {
  onCreateNode: (nodeType: string) => void;
}

const NodeCreationButton: React.FC<NodeCreationButtonProps> = ({onCreateNode}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (nodeType: string) => {
    onCreateNode(nodeType);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClick}>
        Create Node
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className="orange-node" onClick={() => handleMenuItemClick('orange')}>Orange</MenuItem>
        <MenuItem className="pink-node" onClick={() => handleMenuItemClick('pink')}>Pink</MenuItem>
        <MenuItem className="blue-node" onClick={() => handleMenuItemClick('blue')}>Blue</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('white')}>White</MenuItem>
      </Menu>
    </div>
  );
};

export default NodeCreationButton;