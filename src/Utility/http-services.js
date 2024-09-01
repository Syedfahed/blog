import axios from "axios";

const getHeader = (tokenType, token) => {
  if (tokenType === "defult") {
    return {
      "Content-Type": "application/json",
    };
  } else {
    return {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    };
  }
};
const baseUrl = "https://blog-backend-indv.onrender.com/";
export const postMethod = async (request) => {
  const { endpoint, payload, tokenType } = request;
  const _headers = await getHeader(tokenType);
  const Url = baseUrl + endpoint;
  return axios.post(Url, payload, { headers: _headers });
};

export const getMethod = async (request) => {
  const { endpoint, payload, tokenType } = request;
  const _headers = await getHeader(tokenType);
  const Url = baseUrl + endpoint;
  return axios.get(Url, payload, { headers: _headers });
};

export const putMethod = async (request) => {
  const { endpoint, payload, tokenType } = request;
  const _headers = await getHeader(tokenType);
  const Url = baseUrl + endpoint;
  return axios.put(Url, payload, { headers: _headers });
};