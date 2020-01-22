<template>
    <v-card class="mx-auto mt-4 mb-4" max-width="700">
      <v-toolbar dark >        
        <v-btn small @click="search" color="purple" class="ml-2">Buscar</v-btn>
        <v-autocomplete
          color="purple"
          v-model="titleSelected"
          :loading="loading"
          :items="comics"
          :search-input.sync="textSearch"
          cache-items
          class="mx-2"      
          hide-no-data
          hide-details      
          solo-inverted></v-autocomplete>
        <v-switch v-model="onlyFav" label="Solo favoritos" color="purple" class="mt-5"></v-switch>        
      </v-toolbar>
      
    </v-card>  
</template>

<script>

import { ServiceFactory } from "../services/ServiceFactory"
const ListComicsService = ServiceFactory.get("listComics")

export default {
  name: "SearchComics",
  data: function() {
    return {
      textSearch: null,
      titleSelected: null,
      onlyFav: false,    
      comics: [],
      loading: false
    }
  },
  created() {
    this.getComics('')
  },
  watch: {
    textSearch (text) {
      text && text !== this.select && this.getComics(text)
    },
    onlyFav() {
      this.showOnlyFav()
    }
  },
  methods: {
    async getComics(textSearch) {
      this.loading = true
      const { data } = await ListComicsService.getTitleAutocomplete(textSearch)

      let listComics = data.data.results
      let comics = []
      listComics.forEach(element => {
        comics.push(
          element.title
        )
      })
      this.comics = comics
      this.loading = false
    },
    search() {      
      this.$emit("search", this.textSearch)
    },
    showOnlyFav() {      
      this.$emit("showOnlyFav", this.onlyFav)
    },
  }
}

</script>
