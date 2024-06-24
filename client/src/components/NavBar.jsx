import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to='/posts'>Posts</Link>
      <span> | </span>
      <Link to='/posts/new'>New Post</Link>
    </nav>
  )
}

export default NavBar;