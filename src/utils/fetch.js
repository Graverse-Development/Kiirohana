import axios from "axios";

const fetch = async (url) => {
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw TypeError(error);
    });
};

export default fetch;
