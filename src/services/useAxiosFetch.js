import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const cache = {};

export function useAxiosFetch(url, { method = 'GET', data = null } = {}) {
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cacheRef = useRef(cache);

    useEffect(() => { 
        if (cacheRef.current[url]) {
            setResponseData(cacheRef.current[url]);
            setLoading(false);
            return;
        }

        async function fetchData() {
            setLoading(true);
            try {
                const response = await axios({url, method, data});
                cacheRef.current[url] = response.data; 
                setResponseData(response.data);
            } catch (error) {
                setError(error.message || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url, method, data]);

    return { data: responseData, loading, error };
}
