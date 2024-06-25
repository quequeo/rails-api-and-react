import React from 'react';
import { API_URL } from '../../../constants';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PostsList () {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch posts from the API and render the list of posts
  useEffect(() => {
    fetch(`${API_URL}/posts`)
    .then(response => response.json())
    .then(data => {
      setPosts(data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
      console.log(error);
    });
  }, []);

  return (
    <div>
    <h2>Posts List</h2>
    {loading && <p>Loading posts...</p>}
    {error && <p>Error loading posts: {error.message}</p>}
      <div>
        {posts.map(post => (
          <div key={post.id} className='post-container'>
            <h2>
              <Link to={`/posts/${post.id}`} className='post-title'>
                {post.title}
                </Link>
            </h2>
            <p>{post.body}</p>
            <div>
              <Link to={`/posts/${post.id}/edit`} className='post-edit'>
                Edit post
              </Link>
            </div>
            <button onClick={() => {
              fetch(`${API_URL}/posts/${post.id}`, {
                method: 'DELETE',
              })
              .then(() => {
                setPosts(posts.filter(p => p.id !== post.id))
              })
              .catch(error => {
                setError(error);
                console.log(error);
              });
            }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostsList;