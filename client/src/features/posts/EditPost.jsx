import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, updatePost } from '../../services/postService';
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
    async function fetchPost() {
      try {
        const data = await fetchPostById(id);
        setTitle(data.title);
        setBody(data.body);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPost = { title: title, body: body };
    updatePost(id, updatedPost)
      .then(() => {
        navigate(`/posts/${id}`);
      })
      .catch(error => {
        setError(error);
      }
    );
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
