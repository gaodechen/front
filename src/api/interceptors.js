export default (axios) => {
    axios.interceptors.request.use(
        config => {
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )
}