import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../services/postService';
import PostForm from './PostForm';

function NewPost() {
  const navigate = useNavigate();

  const handleSubmit = async (rawData) => {
    const postData = new FormData();
    postData.append('post[title]', rawData.title);
    postData.append('post[image]', rawData.image);
    postData.append('post[body]', rawData.body);

    try {
      await createPost(postData);
      navigate('/posts/');
    } catch (error) {
      console.error('Error creating post: ', error);
    } 
  }

  return (
    <PostForm
      post={{ title: '', image: '', body: '' }} 
      onSubmit={handleSubmit} 
      buttonText="Create Post" 
    />
  );
}

export default NewPost;
