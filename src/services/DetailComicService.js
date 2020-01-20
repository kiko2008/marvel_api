import ApiService from "./ApiService"

const resource = "/posts"
export default {
    get(){        
        return ApiService.get(`${resource}`)
    }
}