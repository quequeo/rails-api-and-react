import React, { useState, useEffect } from 'react';
import { deletePost } from '../../services/postService';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { red, indigo } from '@mui/material/colors';

import SearchBar from './SearchBar';
import usePostsData from '../../hooks/usePostsData';
import useURLSearchParam from "../../hooks/useURLSearchParam";

import Pagination from "./Pagination";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [debounceSearchTerm, setDebounceSearchTerm] = useURLSearchParam('search');
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPageFromURL = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(initialPageFromURL);

  const {
    posts: fetchedPosts,
    loading: loading,
    error: error,
    totalPosts: totalPosts,
    perPage: perPage
  } = usePostsData(debounceSearchTerm, currentPage);

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  useEffect(() => {
    const initialSearchTerm = searchParams.get("search") || "";
    setSearchTerm(initialSearchTerm);

    const pageFromURL = searchParams.get("page") || "1";
    setCurrentPage(Number(pageFromURL));
  }, [searchParams]);

  const handleDelete = (post_id) => {
    deletePost(post_id)
      .then(() => {
        setPosts(posts.filter(post => post.id !== post_id));
      })
      .catch(error => {
        setError(error);
      }
    );
  };

  const handleInmediateSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  }

  const handleDebounceSearchChange = (searchValue) => {
    setDebounceSearchTerm(searchValue);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Update the URL to include the page number
    setSearchParams({ search: debounceSearchTerm, page: page.toString() });
  };

  return (
    <Container>
      <Box mt={4}>
        {loading && <Typography>Loading posts...</Typography>}
        {error && <Typography color="error">Error loading posts: {error.message}</Typography>}
        <SearchBar
          value={searchTerm}
          onImmediateChange={handleInmediateSearchChange}
          onDebounceChange={handleDebounceSearchChange}
        />
        <Pagination
          currentPage={currentPage}
          totalPosts={totalPosts}
          postsPerPage={perPage}
          onPageChange={handlePageChange}
        />
        <Box mt={2}>
          {posts.map(post => (
            <Paper key={post.id} elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
              {post.image}
              <Typography variant="h5" component={Link} to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {post.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {post.body}
              </Typography>
              {post.image_url && (
                <Box mt={2}>
                  <img src={post.image_url} alt="Preview" style={{ width: '200px', height: 'auto' }} />
                </Box>
              )}
              <Box display="flex" justifyContent="space-between">
                <Button
                  component={Link}
                  to={`/posts/${post.id}/edit`}
                  variant="contained"
                  startIcon={<EditIcon />}
                  style={{ backgroundColor: indigo[500], color: '#fff' }}
                >
                  Edit post
                </Button>
                <Button
                  variant="contained" 
                  startIcon={<DeleteIcon />}
                  style={{ backgroundColor: red[400], color: '#fff' }}
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
