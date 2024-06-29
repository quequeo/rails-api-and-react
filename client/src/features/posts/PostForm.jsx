import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

function PostForm({ post, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({ title: '', body: '' });
  
  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  return (
    <Container maxWidth="sm">
      <Box 
      component="form" 
      onSubmit={(e) => { 
        e.preventDefault(); 
        onSubmit(formData);
      }}
       noValidate sx={{ mt: 3 }}
      >
        <TextField
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="body"
          label="Body"
          name="body"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        {buttonText === "Update Post" ? (
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
        ) : (
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
        )}

      </Box>
    </Container>
  )
}

PostForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default PostForm;