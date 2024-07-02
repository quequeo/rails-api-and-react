import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPostById, deletePost } from '../../services/postService';
import { Typography, Button, Container, Box, CircularProgress, Alert, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await fetchPostById(id);
        setPost(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleDelete = () => {
    deletePost(id)
      .then(() => {
        navigate('/posts');
      })
      .catch(error => {
        setError(error);
      }
    );
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

              {post.image_url && (
                <Box mt={2}>
                  <img src={post.image_url} alt="Preview" style={{ width: '200px', height: 'auto' }} />
                </Box>
              )}
              <Box mt={2}>
                <Button 
                  component={Link} 
                  to={`/posts/${id}/edit`} 
                  variant="contained" 
                  startIcon={<EditIcon />}
                  color="primary" 
                  sx={{ mr: 2 }}
                >
                  Edit
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<DeleteIcon />}
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
