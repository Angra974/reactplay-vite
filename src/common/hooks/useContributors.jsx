import { useState, useEffect } from 'react';
import useFetch from 'common/hooks/useFetch';

/**
 * Retrieves the contributors name in react play repo on github
 * @param {boolean} sorted mandatory
 * @returns [data, error, loading]
 */

const useContributors = (sorted) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data, loading, error } = await useFetch(
          `${process.env.REACT_APP_PLAY_API_URL}/contributors`
        );

        // Remove the bots
        const contributors = data.filter((contributor) => contributor.type !== 'Bot');

        // Sort it by the contributions
        sorted && contributors.sort((a, b) => b.contributions - a.contributions);
        if (error) setError(error);
        setData(contributors);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [sorted]);

  return { data, error, isLoading };
};

export default useContributors;
