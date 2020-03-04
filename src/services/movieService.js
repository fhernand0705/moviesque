import http from './http-service';
import { apiEndpoint } from '../config';
import { toast } from 'react-toastify';

export function getMovies() {
  return http.get(apiEndpoint + "/movies");
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + `/movies/${movieId}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = {...movie};
    delete body._id;

    toast.success("The movie has been successfully updated!");

    return http.put(apiEndpoint + `/movies/${movie._id}`, body);
  }
  return http.post(apiEndpoint + "/movies", movie);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + `/movies/${movieId}`);
}
