<template>
  <div>      
    <p></p>
    <div class="loading" v-show="loading">
      <span class="fa fa-spinner fa-spin"></span> Loading
    </div>

    <v-container fluid>
      <v-row dense>
        <v-col v-for="comic in comics" :key="comic.id" :cols="2">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-card class="ma-6">            
                <v-img :contain="true"
                  :src="getThumbnail(comic)" 
                  :alt="comic.title"
                  @click.stop="setSelectedComic(comic); show=true" 
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" >
                </v-img>               
                <v-card-actions>
                  <v-card-title class="pa-md-2 d-inline-block font-weight-regular body-2 text-truncate col-18" 
                    v-on="on" v-text="comic.title" 
                    @click.stop="showDetailComic = true">
                  </v-card-title>
                  <v-spacer></v-spacer>
                  
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
            <span>{{ comic.title }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-pagination
        v-model="pagination.page"
        :length="pagination.totalPages"
        total-visible="10"
        @input="getComics"
        color="purple"
        circle ></v-pagination>
    </v-container>
  </div>
</template>

<script>

import { ServiceFactory } from '../services/ServiceFactory'
const ListComicsService = ServiceFactory.get('listComics')

export default {
  name: 'ListComics',
  data: function () {
    return {
      pagination: {
        page: 1,
        totalPages: 0
      },
      loading: false,      
      comics: []
    }
  },
  created() {
    this.getComics()
  },  
  methods: {
    async getComics() {      
      this.loading = true
      const { data } = await ListComicsService.get(this.pagination.page)      
      this.comics = data.data.results
      this.pagination.totalPages = Math.round(data.data.total/30)
      this.loading = false
    },
    setSelectedComic(comic) {
      if (comic) {
         this.$emit('setSelectedComic', comic)
      }      
    },
    getThumbnail(comic) {
      return `${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (value) {
          this.$emit('openDetail')
        }
      }
    }
  }
};
</script>
