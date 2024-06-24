import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../constants';

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
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <Link to={`/posts/${id}/edit`}>Edit</Link>
        <button onClick={() => {
          fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE',
          })
          .then(() => navigate('/posts'))
          .catch(error => {
            setError(error);
            console.log(error);
          });
        }}>Delete</button>
      </div>
    </div>
  )
}

export default PostDetails;