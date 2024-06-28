import { API_URL } from "../../constants";

async function fetchAllPosts() {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error(`Error fetching posts: ${response.statusText}`);
  }
  return response.json();
}

async function fetchPostById(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching post: ${response.statusText}`);
  }
  return response.json();
}

async function createPost(post) {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error(`Error creating post: ${response.statusText}`);
  }
}

async function updatePost(id, post) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error(`Error updating post: ${response.statusText}`);
  }
}

async function deletePost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error deleting post: ${response.statusText}`);
  }
}

export { fetchAllPosts, fetchPostById, createPost, updatePost, deletePost };