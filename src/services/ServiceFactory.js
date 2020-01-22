import ListComicsService from "./ListComicsService"

const repositories = {
    listComics: ListComicsService    
}

export const ServiceFactory = {
    get: name => repositories[name]
}