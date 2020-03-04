import http from './http-service';
import { apiEndpoint } from '../config';
import { toast } from 'react-toastify';

function movieUrl(id) {
  return `${apiEndpoint}/movies/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint + "/movies");
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = {...movie};
    delete body._id;

    toast.success(`The movie (${movie.title}) has been updated!`, {
      //position:"top-center"
    });

    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndpoint + "/movies", movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
