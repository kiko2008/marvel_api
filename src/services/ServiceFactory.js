import ListComicsService from "./ListComicsService"
import DetailComicService from "./DetailComicService"

const repositories = {
    listComics: ListComicsService,
    detailComic: DetailComicService
}

export const ServiceFactory = {
    get: name => repositories[name]
}