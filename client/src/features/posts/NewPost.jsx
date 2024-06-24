import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../constants';

function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, body } = event.target.elements;
    const post = {
      title: title.value,
      body: body.value,
    };
    fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    .then(() => {
      console.log('Post created');
      title.value = '';
      body.value = '';
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
  }
  

  return (
    <div>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="body">Body:</label>
          <textarea 
            id="body" 
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  )
}

export default NewPost;