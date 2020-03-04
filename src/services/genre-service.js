import http from './http-service';
import { apiUrl } from '../config';

export function getGenres() {
  return http.get(apiUrl + "/genres");
}
