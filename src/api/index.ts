const API_BASE_URL = "http://localhost:57033";

export const getRequest = async <T>(path: string): Promise<T> => {
  const res = await fetch(API_BASE_URL + path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
