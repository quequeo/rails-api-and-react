import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function PostsNavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Posts App
        </Typography>
        <Button component={Link} to='/posts' color="inherit">
          Home
        </Button>
        <Button component={Link} to='/posts/new' color="inherit">
          New Post
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default PostsNavBar;
