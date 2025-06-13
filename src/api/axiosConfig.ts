import axios from 'axios';

import {APP_CONFIG} from "@constants/common.ts";

const {API_BASE_URL} = APP_CONFIG;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});