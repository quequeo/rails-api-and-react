import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../../constants';
import './PostDetails.css'; // Asegúrate de usar la ruta correcta

function PostDetails() {
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
      <h2>Post Details</h2>
      {loading && <p>Loading post...</p>}
      {error && <p>Error loading post: {error.message}</p>}
      <div className="post-details">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-body">{post.body}</p>
        <Link to={`/posts/${id}/edit`} className="edit-link">Edit</Link>
        <button onClick={() => {
          fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' })
            .then(() => navigate('/posts'))
            .catch(error => {
              setError(error);
              console.log(error);
            });
        }}>Delete</button>
      </div>
    </div>
  );
}

export default PostDetails;
