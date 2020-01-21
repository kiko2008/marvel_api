import ApiService from "./ApiService"

const API_KEY = process.env.VUE_APP_API_KEY;
const HASH = process.env.VUE_APP_HASH;
const RESOURCE = `/comics?ts=1&apikey=${API_KEY}&hash=${HASH}`
const ORDER = 'title'

export default {
    get(page) {
        let limit= 30
        let offset= page*limit
        return ApiService.get(`${RESOURCE}&limit=${limit}&offset=${offset}&orderBy=${ORDER}`)
    },
    getTitleAutocomplete(searchText) {
        let limit= 20        
        let query = `${RESOURCE}&limit=${limit}&offset=0&orderBy=${ORDER}`
        if (searchText && searchText.length > 4) {
            query = query.concat(`&titleStartsWith=${searchText}`)
        }
        return ApiService.get(query)
    }
}