const API_HOST = "https://kicker404.mercdev.com";

/* global fetch */

async function request(path, options = {}) {
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
  get: path => {
    return request(path);
  },
  post: (path, body) => {
    return request(path, {
      method: "post",
      body: JSON.stringify(body)
    });
  },
  delete: (path, body) => {
    return request(path, {
      method: "delete",
      body: JSON.stringify(body)
    });
  }
};

export default api;
