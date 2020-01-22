<template>
  <div>     
    <div v-if="loading" class="text-center">     
      <v-progress-circular :size="100" color="purple" indeterminate>
        <v-progress-circular :width="3" color="purple" indeterminate></v-progress-circular>          
      </v-progress-circular>      
    </div>
    <div v-if="!loading">
      <v-layout>
        <v-flex>
          <v-card>
            <v-container fluid grid-list-md>
              <div v-if="comicsShow.length > 0">
                <v-layout row wrap>               
                  <v-flex xs12 md4 lg2 v-for="comic in comicsShow" :key="comic.id">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-card class="ma-2">
                          <v-img
                            :contain="true"
                            :src="comic.cover"
                            :alt="comic.title"
                            @click.stop="setSelectedComic(comic); show=true"
                            class="white--text align-end clickable"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          ></v-img>
                          <v-card-actions>
                            <v-card-title
                              class="pa-md-2 d-inline-block font-weight-regular body-2 text-truncate col-18"
                              v-on="on"
                              v-text="comic.title"
                              @click.stop="setSelectedComic(comic); show=true"
                            ></v-card-title>
                            <v-spacer></v-spacer>
                            <v-icon :color="comic.colorFav">mdi-heart</v-icon>
                          </v-card-actions>
                        </v-card>
                      </template>
                      <span>{{ comic.title }}</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </div>  
              <div class="text-center" v-else >
                No hay comics que coincidan con el filtro
              </div>             
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <div class="text-xs-center">
        <v-pagination
          class="mt-8 mb-8"
          v-model="pagination.page"
          :length="pagination.totalPages"
          total-visible="10"
          @input="getComics"
          color="purple"
          circle
        ></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>

import { ServiceFactory } from "../services/ServiceFactory"
const ListComicsService = ServiceFactory.get("listComics")

export default {
  name: "ListComics",
  props: {
    filterSearch: String,
    filterFav: Boolean
  },  
  data: function() {
    return {
      pagination: {
        page: 1,
        totalPages: 0
      },      
      loading: false,
      comics: [],
      comicsShow: []
    }
  },
  created() {
    this.getComics()
  },  
  watch: {
    filterSearch () {
      this.getComics()
    },
    filterFav () {
      this.filterOnlyFavs()
    }
  },
  methods: {
    async getComics() {
      this.loading = true
      const { data } = await ListComicsService.get(
        this.pagination.page, this.filterSearch  
      )
      let listComics = data.data.results
      let comics = []
      listComics.forEach(element => {
        comics.push({
          id: element.id,
          title: element.title,
          description: element.description === null? 'Sin descripcion': element.description,
          cover: `${element.thumbnail.path}/standard_fantastic.${
            element.thumbnail.extension
          }`,
          price: element.prices[0].price == null? '0$': `${element.prices[0].price}$`,
          colorFav: localStorage.getItem(`comic-fav-${element.id}`) === "true" ? 'purple' : 'white'
        })
      })
      this.comics = comics      
      this.comicsShow = comics 
      this.pagination.totalPages = Math.round(data.data.total / 30)
      this.loading = false
    },
    setSelectedComic(comic) {
      if (comic) {
        this.$emit("setSelectedComic", comic)
      }
    },
    filterOnlyFavs() {
      let comicsFav = []
      if (this.filterFav != null) {                
        if (this.filterFav) {
          
          this.comics.forEach(element => {
            if (localStorage.getItem(`comic-fav-${element.id}`)==="true"){
              comicsFav.push(element)
            }
          })   
          this.comicsShow = comicsFav
        } else{
          this.comicsShow = this.comics
        }  
      }
    },
  },
  computed: {    
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (value) {
          this.$emit("openDetail")
        }
      }
    }    
  }
}
</script>
