import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../constants';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setTitle] = useState('');
  const [, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, body } = event.target.elements;
    const post = {
      title: title.value,
      body: body.value,
    };
    fetch(`${API_URL}/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    .then(() => {
      console.log('Post edited');
      title.value = '';
      body.value = '';
    })
    .catch(error => {
      console.error('Error editing post:', error);
    });
  }

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
    .then(response => response.json())
    .then(data => {
      setPost(data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
      console.log(error);
    });
  }, [id]);

  return (
    <div>
      <h2>Edit Post</h2>
      {loading && <p>Loading post...</p>}
      {error && <p>Error loading post: {error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            defaultValue={post.title}
            onChange={(e) => setTitle(e.target.value)} 
          />
          <label htmlFor="body">Body:</label>
          <textarea 
            id="body" 
            name="body" 
            defaultValue={post.body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button type="submit">Edit Post</button>
        </div>
      </form>
    </div>
  )
}

export default EditPost;


