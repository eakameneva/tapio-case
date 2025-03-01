import { Post } from "../store/postDTO";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type RequestBody = Partial<Post> | null;

const makeRequest = async (
  url: string,
  method: HttpMethod = "GET",
  body: RequestBody = null
): Promise<Response> => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });
};

export default makeRequest;
