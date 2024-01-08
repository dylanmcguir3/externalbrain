import React from 'react';
import Button from '@mui/material/Button';

export default function ClearNodesButton() {
  const clearDatabase = async () => {
    try {
      const response = await fetch('/api/clearnodes', { method: 'POST' });
      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={clearDatabase}>
      Clear Database
    </Button>
  );
}