import React from 'react';

function NewPost() {

  
  
  return (
    <div>
      <h2>New Post</h2>
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="body">Body:</label>
        <textarea id="body" name="body" />
        <button type="submit">Create Post</button>
      </form>
    </div>
  )
}

export default NewPost;