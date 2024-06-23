import React from 'react';
import { API_URL } from '../../../constants';
import { useState, useEffect } from 'react';

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
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostsList;