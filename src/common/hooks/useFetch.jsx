import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 *
 * @param {string} url api url
 * @param {object} options object
 * @returns { data, loading, error }
 */

const useFetch = (url, method = "get", body = null, headers = null ) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](url, JSON.parse(headers), JSON.parse(body))
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
              error && process.env.mode !== 'production' && console.log(error);
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { data, error, loading };
};

export default useFetch;
