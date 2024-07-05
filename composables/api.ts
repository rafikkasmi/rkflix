// Create a fetch object with a baseURL already setup
const API_KEY = "fc0f0776a79e75e8888a8335a281da5c"

export const movieAPI = (url, page = 1, options = {}) => useFetch(`https://api.themoviedb.org/3${url}?api_key=${API_KEY}&page=${page}`, options)

export const searchMovie = (query, page = 1, options = {}) => useFetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`, options)


