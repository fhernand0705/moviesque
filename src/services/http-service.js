import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './error-log-service';
import auth from './auth-service';

axios.defaults.headers.common['x-auth-token'] = auth.getJwt();

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

    if (!expectedError) {
      logger.log(error);
      toast.error("An unexpected error ocurred")
    }

    return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}
