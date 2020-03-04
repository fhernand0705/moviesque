import http from './http-service';
import { apiEndpoint } from '../config';

export function createUser(user) {
  return http.post(apiEndpoint + "/users", {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
