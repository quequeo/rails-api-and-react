import React from 'react';
import { Route, Routes } from "react-router-dom";

import PostsList from "../../features/posts/PostsList";
import NewPost from "../../features/posts/NewPost";
import PostDetails from "../../features/posts/PostDetails";
import EditPost from '../../features/posts/EditPost';

function PostAppRoutes() {
  return (
    <Routes>
      <Route path="/posts" element={<PostsList />} />
      <Route path="posts/:id" element={<PostDetails />} />
      <Route path="/posts/new" element={<NewPost />} />
      <Route path="posts/:id/edit" element={<EditPost />} />
    </Routes>
  );
}

export default PostAppRoutes;