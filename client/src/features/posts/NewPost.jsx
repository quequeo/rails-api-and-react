import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../constants';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const post = {
      title: title,
      body: body,
    };
    fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    .then(() => {
      console.log('Post created');
      setTitle('');
      setBody('');
      navigate('/posts');
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <TextField
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="body"
          label="Body"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          startIcon={<AddBoxIcon />}
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Post
        </Button>
      </Box>
    </Container>
  );
}

export default NewPost;
