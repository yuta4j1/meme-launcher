const API_BASE_URL = "https://meme-launcher-server.kascado-ys10.workers.dev";

export const getRequest = async <T>(path: string): Promise<T> => {
  const res = await fetch(API_BASE_URL + path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const postRequest = async <P, R>(path: string, param: P): Promise<R> => {
  const res = await fetch(API_BASE_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });
  return res.json();
};
