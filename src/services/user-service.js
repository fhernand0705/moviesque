import http from './http-service';
import { apiUrl } from '../config';

const apiEndpoint = apiUrl + "/users";

export function createUser(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
