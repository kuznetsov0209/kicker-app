export const API_HOST = "https://api.kicker.mercdev.com";

/* global fetch */

async function request(path: string, options = {}) {
  const url = `${API_HOST}${path}`;
  const json = await fetch(url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    ...options
  }).then(response => response.json());

  return json;
}

const api = {
  get: (path: string) => {
    return request(path);
  },
  post: (path: string, body?: Object) => {
    return request(path, {
      method: "post",
      body: JSON.stringify(body)
    });
  },
  delete: (path: string, body?: Object) => {
    return request(path, {
      method: "delete",
      body: JSON.stringify(body)
    });
  }
};

export default api;
