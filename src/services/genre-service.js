import http from './http-service';

export function getGenres() {
  return http.get("/genres");
}
