import { useState, useEffect } from "react";
import { fetchAllPosts, searchPosts } from "../services/postService";

function usePostsData(searchTerm, page = 1) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        let data;
        if (searchTerm) {
          data = await searchPosts(searchTerm, page);
        } else {
          data = await fetchAllPosts(page);
        }
        
        if (data.posts) {
          setPosts(data.posts);
          setTotalPosts(data.total_posts_count);
          setPerPage(data.per_page);
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
  }, [searchTerm, page]);

  return { posts, loading, error, totalPosts, perPage };
}

export default usePostsData;