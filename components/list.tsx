"use client"
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

interface Link {
  id: number;
  url: string;
  comments: string[];
}

function LinkList() {
  const [links, setLinks] = useState<Link[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [currentComment, setCurrentComment] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await axios.get('/api/links');
      setLinks(response.data);
    };

    fetchLinks();
  }, []);

  const handleAddLink = async () => {
    let newLink = prompt('Enter new link URL:');
    if (newLink) {
      newLink = formatUrl(newLink);
      try {
        const response = await axios.post('/api/links', { url: newLink });
        setLinks([...links, response.data]);
      } catch (error) {
        console.error('An error occurred while adding the link:', error);
      }
    }
  };

  const formatUrl = (url: string): string => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const handleRemoveLink = index => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleAddComment = index => {
    setCurrentIndex(index);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentComment('');
  };

  const handleSubmitComment = () => {
    if (currentComment) {
      const updatedLinks = [...links];
      updatedLinks[currentIndex].comments.push(currentComment);
      setLinks(updatedLinks);
      handleCloseDialog();
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleAddLink}>Add New Link</Button>
      <List>
        {links.map((link, index) => (
          <ListItem key={index} sx={{maxWidth : 1000,     border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0px 2px 2px rgba(0,0,0,0.2)'}}>
            <ListItemText 
              primary={<a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>} 
              secondary={link.comments.join(', ')} 
            />
            <Button sx={{margin : 2}} variant="outlined" onClick={() => handleAddComment(index)}>Add Comment</Button>
            <Button variant="outlined" onClick={() => handleRemoveLink(index)}>Remove Link</Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add a Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitComment}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LinkList;
