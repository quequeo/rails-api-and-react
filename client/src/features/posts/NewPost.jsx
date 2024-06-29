import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../services/postService';
import PostForm from './PostForm';

function NewPost() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await createPost(formData);
      navigate('/posts');
    } catch (error) {
      console.error('Error creating post: ', error);
    } 
  }

  return (
    <PostForm
      post={{ title: '', body: '' }} 
      onSubmit={handleSubmit} 
      buttonText="Create Post" 
    />
  );
}

export default NewPost;
