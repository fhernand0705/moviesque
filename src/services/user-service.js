import http from './http-service';

const apiEndpoint = "/users";

export function createUser(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
