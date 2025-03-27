const fetchAPI = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json();
  return data;
};

export { fetchAPI };
