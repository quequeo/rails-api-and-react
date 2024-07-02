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

async function createPost(postData) {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    body: postData
  });
  if (!response.ok) {
    throw new Error(`Error creating post: ${response.statusText}`);
  }
}

async function updatePost(id, postData) {
  console.log('Sending data to server:', Object.fromEntries(postData));
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PATCH',  // Cambiamos PUT por PATCH
    body: postData,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Error updating post: ${response.statusText}`);
  }
  return response.json();
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