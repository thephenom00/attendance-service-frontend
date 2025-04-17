const API_CONFIG = {
    // BASE_URL: 'http://localhost:8080',
    BASE_URL: 'https://dojolog.up.railway.app',

    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            REFRESH: '/auth/refresh'
        }
    },

    TIMEOUT: 5000,

    HEADERS: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};

export default API_CONFIG;
