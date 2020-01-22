<template>
  <div class="home">
    <DetailComic :visible="showDetailComic" @closeDetail="showDetailComic=false" :selected-comic="selectedComic" />
    <SearchComics @applyFilters="applyFilters" />    
    <ListComics @setSelectedComic="setSelectedComic" @openDetail="showDetailComic=true" :filters-search="filtersSearch"/>    
  </div>
</template>

<script>

import SearchComics from '@/components/SearchComics.vue'
import ListComics from '@/components/ListComics.vue'
import DetailComic from '@/components/DetailComic.vue'

export default {
  name: 'home',
  data: function () {
    return {
      showDetailComic: false,
      selectedComic: {},
      filtersSearch: null
    }
  },
  components: {
    SearchComics,
    ListComics,
    DetailComic
  },
  methods: {
    setSelectedComic(comic) {
      this.selectedComic = comic
    },
    applyFilters(filters) {
      this.filtersSearch = filters
    }
  }
}
</script>
