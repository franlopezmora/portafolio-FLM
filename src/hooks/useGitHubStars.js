import { useState, useEffect } from 'react';

export const useGitHubStars = (owner, repo) => {
  const [stars, setStars] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setStars(data.stargazers_count);
        setError(null);
      } catch (err) {
        console.error(`Error fetching stars for ${owner}/${repo}:`, err);
        setError(err.message);
        setStars(0); // Fallback a 0 si hay error
      } finally {
        setLoading(false);
      }
    };

    if (owner && repo) {
      fetchStars();
    }
  }, [owner, repo]);

  return { stars, loading, error };
};
