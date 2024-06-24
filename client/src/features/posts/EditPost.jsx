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
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" defaultValue={post.title} />
        <label htmlFor="body">Body:</label>
        <textarea id="body" name="body" defaultValue={post.body} />
        <button type="submit">Update Post</button>
      </form>
    </div>
  )
}

export default EditPost;


