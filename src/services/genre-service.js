import http from './http-service';
import { apiEndpoint } from '../config';

export function getGenres() {
  return http.get(apiEndpoint + "/genres");
}
