import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Copyright from './Copyright';
import ProTip from './ProTip';

// Posts App
import PostsNavBar from './components/posts/PostsNavBar';
import PostAppRoutes from './components/posts/PostAppRoutes';
// End Posts App

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
            Rails & React App
          </Typography>
          <ProTip />

          {/* Posts App */}
          <PostsNavBar />
          <PostAppRoutes />
          {/* End Posts App */}
        </Box>
        <Copyright />
      </Container>
    </Router>
  );
}

export default App;
