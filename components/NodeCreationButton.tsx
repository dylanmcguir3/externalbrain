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
        <MenuItem onClick={() => handleMenuItemClick('Assumption')}>Assumption Node</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Conversation')}>Conversation Node</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Research')}>Research Node</MenuItem>
      </Menu>
    </div>
  );
};

export default NodeCreationButton;