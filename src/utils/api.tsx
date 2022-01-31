import axios from 'axios';
import { baseUrl } from './constants';

export default axios.create({
  baseURL: baseUrl,
  responseType: 'json',
});
