import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../constants';
import './EditPost.css'; // Asegúrate de usar la ruta correcta

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setBody(data.body);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPost = {
      title: title,
      body: body,
    };
    fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    })
    .then(() => {
      console.log('Post updated');
      navigate(`/posts/${id}`);
    })
    .catch(error => {
      console.error('Error updating post:', error);
    });
  }

  return (
    <div className="edit-post-container">
      <h2 className="edit-post-title">Edit Post</h2>
      {loading && <p>Loading post...</p>}
      {error && <p>Error loading post: {error.message}</p>}
      <form className="edit-post-form" onSubmit={handleSubmit}>
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
          <button type="submit">Update Post</button>
        </div>
      </form>
    </div>
  )
}

export default EditPost;
