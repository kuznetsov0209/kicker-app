const API_HOST = 'https://kicker.mercdev.com';

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
  get: async path => {
    return await request(path);
  },
  post: async (path, body) => {
    return await request(path, {
      method: "post",
      body: JSON.stringify(body)
    });
  },
  delete: async (path, body) => {
    return await request(path, {
      method: "delete",
      body: JSON.stringify(body)
    });
  }
};

export default api;
