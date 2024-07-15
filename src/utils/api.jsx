import {create} from 'apisauce';

const API_URL = 'http://13.209.27.220:8080';

export const api = create({baseURL: API_URL});