import { useState, useEffect } from 'react';

export const useGitHubStars = (owner, repo) => {
  const [stars, setStars] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!owner || !repo) {
      setStars(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const fetchStars = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
          signal: controller.signal,
        });
        
        if (!response.ok) {
          setStars(null);
          setError(response.status);
          return;
        }
        
        const data = await response.json();
        setStars(typeof data.stargazers_count === "number" ? data.stargazers_count : null);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setStars(null);
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchStars();

    return () => controller.abort();
  }, [owner, repo]);

  return { stars, loading, error };
};
