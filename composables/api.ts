// Create a fetch object with a baseURL already setup
const API_KEY = "fc0f0776a79e75e8888a8335a281da5c"

export const movieAPI = (url, options = {}) => useLazyFetch(`https://api.themoviedb.org/3/${url}?api_key=${API_KEY}`, options)

export const searchMovie = (query, options = {}) => useLazyFetch(`https://api.themoviedb.org/3/search?api_key=${API_KEY}&query=${query}`, options)


