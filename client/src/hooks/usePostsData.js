import { useState, useEffect } from "react";
import { fetchAllPosts, searchPosts } from "../services/postService";

function usePostsData(searchTerm) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        let data;
        if (searchTerm) {
          data = await searchPosts(searchTerm);
        } else {
          data = await fetchAllPosts();
        }
        
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (data && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.error("Formato de datos inesperado:", data);
          setPosts([]);
        }
      } catch (e) {
        console.error("Error al cargar posts:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [searchTerm]);

  return { posts, loading, error };
}

export default usePostsData;