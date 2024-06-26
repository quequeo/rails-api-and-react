import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../../constants';
import { Typography, Button, Container, Box, CircularProgress, Alert, Paper } from '@mui/material';

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' })
      .then(() => navigate('/posts'))
      .catch(error => {
        setError(error);
        console.log(error);
      });
  };

  return (
    <Container>
      <Box mt={4}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{`Error loading post: ${error.message}`}</Alert>
        ) : (
          <Box mt={2}>
            <Paper key={post.id} elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {post.body}
              </Typography>
              <Box mt={2}>
                <Button 
                  component={Link} 
                  to={`/posts/${id}/edit`} 
                  variant="contained" 
                  color="primary" 
                  sx={{ mr: 2 }}
                >
                  Edit
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default PostDetails;
