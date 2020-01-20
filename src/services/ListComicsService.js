import ApiService from "./ApiService"

const API_KEY = process.env.VUE_APP_API_KEY;
const HASH = process.env.VUE_APP_HASH;
const resource = `/comics?ts=1&apikey=${API_KEY}&hash=${HASH}`

export default {
    get(page) {
        let limit=30
        let offset=page*limit
        return ApiService.get(`${resource}&limit=${limit}&offset=${offset}`)
    }
}