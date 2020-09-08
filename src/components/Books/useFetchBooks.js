import { useState, useEffect } from "react";

export const useFetchBooks = (page = 1, limit = 20) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchBooks = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await fetch("http://nyx.vima.ekt.gr:3000/api/books", {
          method: "POST",
          body: JSON.stringify({
            page,
            itemsPerPage: limit,
          }),
        });

        if (response.ok) {
          const json = await response.json();
          setLoading(false);
          return setData(json);
        }

        throw response;
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchBooks();
  }, [page, limit]);

  return { loading, error, data };
};
