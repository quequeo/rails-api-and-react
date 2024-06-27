import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../constants';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleDelete = (post_id) => {
    fetch(`${API_URL}/posts/${post_id}`, 
      { method: 'DELETE' })
      .then(() => {
        setPosts(posts.filter(p => p.id !== post_id));
      })
      .catch(error => {
        setError(error);
        console.log(error);
      }
    );
  };
    

  return (
    <Container>
      <Box mt={4}>
        {loading && <Typography>Loading posts...</Typography>}
        {error && <Typography color="error">Error loading posts: {error.message}</Typography>}
        <Box mt={2}>
          {posts.map(post => (
            <Paper key={post.id} elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
              <Typography variant="h5" component={Link} to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {post.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {post.body}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Button
                  component={Link}
                  to={`/posts/${post.id}/edit`}
                  variant="contained"
                  startIcon={<EditIcon />}
                  color="primary"
                >
                  Edit post
                </Button>
                <Button
                  variant="contained" 
                  startIcon={<DeleteIcon />}
                  color="secondary"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default PostsList;
