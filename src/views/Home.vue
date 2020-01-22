<template>
  <div class="home">
    <DetailComic :visible="showDetailComic" @closeDetail="showDetailComic=false" :selected-comic="selectedComic" />
    <SearchComics @search="search" @showOnlyFav="showOnlyFav" />
    <ListComics @setSelectedComic="setSelectedComic" @openDetail="showDetailComic=true" :filters-search="filterSearch" :filters-fav="filterFav" />
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
      filterSearch: null,
      filterFav: null
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
    search(filterSearch) {
      this.filterSearch = filterSearch
    },
    showOnlyFav(filterFav) {
      this.filterFav = filterFav
    }
  }
}
</script>
