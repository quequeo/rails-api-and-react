import { useEffect, useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

function PostForm({ post, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({ title: '', image: null, body: '' });
  const [preview, setPreview] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  
  useEffect(() => {
    if (post) {
      setFormData(post);
      setHasImage(!!post.image);
      setPreview(post.image);
    }
  }, [post]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setHasImage(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setFormData({ ...formData, image: null });
    setPreview(null);
    setHasImage(false);
  };

  const handleImageButtonClick = () => {
    document.getElementById('upload-image').click();
  };

  return (
    <Container maxWidth="sm">
      <Box 
        component="form" 
        onSubmit={(e) => { 
          e.preventDefault(); 
          onSubmit(formData);
        }}
        noValidate 
        sx={{ mt: 3 }}
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
        
        <Box mt={2} display="flex" alignItems="center">
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image"
            type="file"
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={hasImage ? <EditIcon /> : <AddBoxIcon />}
            onClick={handleImageButtonClick}
          >
            {hasImage ? 'Edit Image' : 'Upload Image'}
          </Button>
          
          {hasImage && (
            <IconButton onClick={handleDeleteImage} color="secondary" sx={{ ml: 2 }}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>

        {preview && (
          <Box mt={2} position="relative">
            <img src={preview} alt="Preview" style={{ width: '200px', height: 'auto' }} />
          </Box>
        )}

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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          startIcon={buttonText === "Update Post" ? <EditIcon /> : <AddBoxIcon />}
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          {buttonText}
        </Button>
      </Box>
    </Container>
  )
}

PostForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    image: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default PostForm;