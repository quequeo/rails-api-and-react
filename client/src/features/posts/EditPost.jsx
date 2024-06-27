import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../constants';
import { TextField, Button, Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setBody(data.body);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPost = {
      title: title,
      body: body,
    };
    fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    })
    .then(() => {
      console.log('Post updated');
      navigate(`/posts/${id}`);
    })
    .catch(error => {
      console.error('Error updating post:', error);
    });
  }

  return (
    <Container maxWidth="sm">
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{`Error loading post: ${error.message}`}</Alert>
      ) : (
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
            startIcon={<EditIcon />}
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Post
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default EditPost;
