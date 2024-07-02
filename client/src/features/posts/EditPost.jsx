import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, updatePost } from '../../services/postService';
import PostForm from './PostForm';

function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', image: null, body: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await fetchPostById(id);
        setPost({
          title: data.title,
          image: data.image_url,
          body: data.body
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleSubmit = async (formData) => {
    const postData = new FormData();
    postData.append('post[title]', formData.title);
    postData.append('post[body]', formData.body);
    
    if (formData.image instanceof File) {
      postData.append('post[image]', formData.image);
    } else if (formData.image === null) {
      postData.append('post[image]', 'DELETE');
    }
  
    console.log('FormData contents:');
    for (let [key, value] of postData.entries()) {
      console.log(key, value);
    }
  
    try {
      const updatedPost = await updatePost(id, postData);
      console.log('Updated post:', updatedPost);
      navigate('/posts');
    } catch (error) {
      console.error('Error updating post: ', error);
      setError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <PostForm 
      post={post}
      onSubmit={handleSubmit}
      buttonText="Update Post"
    />
  );
}

export default EditPost;