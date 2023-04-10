// https://sebastienlorber.com/handling-api-request-race-conditions-in-react
import { useEffect, useState, useRef } from 'react';

// Will return a promise delayed by a random amount, picked in the delay array
const delayRandomly = () => {
  const timeout = sample([0, 100, 200, 300]);

  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const useFetch = (url, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef({});
  useEffect(() => {
    if (!url) return;

    // Create the current request's abort controller
    const abortController = new AbortController();

    const fetchData = async () => {
      const cache_id = url;
      if (cache.current[cache_id]) {
        const data = cache.current[cache_id];
        setData((current) => data);
        console.log('from cache');
        setLoading(false);
      } else {
        try {
          await fetch(url, { ...options, signal: abortController.signal })
            .then(async (json) => {
              await delayRandomly();

              return json;
            })
            .then((data) => {
              if (abortController.signal.aborted) {
                return;
              }
              setData((current) => data);
              cache.current[cache_id] = data;
              setLoading((curr) => false);
            });
        } catch (error) {
          setError((curr) => error);
          setLoading((curr) => false);
        }
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return { data, loading, error };
};

export default useFetch;
