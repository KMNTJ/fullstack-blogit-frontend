import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const createNew = async (blog) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    return await axios.post(baseUrl, blog, config);
  } catch (error) {
    console.log(error.message);
  }
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll, setToken, createNew };
