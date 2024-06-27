import * as React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
      <Container fixed>
        <Box sx={{ my: 6 }} >
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
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
