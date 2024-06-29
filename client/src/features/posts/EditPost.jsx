import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, updatePost } from '../../services/postService';
import PostForm from './PostForm';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await fetchPostById(id);
        setTitle(data.title);
        setBody(data.body);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updatePost(id, formData);
      navigate('/posts');
    } catch (error) {
      console.error('Error updating post: ', error);
    }
  }

  return (
    <PostForm 
      post={{ title: title, body: body }}
      onSubmit={handleSubmit}
      buttonText="Update Post"
    />
  );
}

export default EditPost;
