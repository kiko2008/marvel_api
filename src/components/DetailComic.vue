
<template>
  <v-row justify="center">
    <v-dialog persistent transition="scale-transition" origin="center center" v-model="show" max-width="1000px">
      <v-card class="d-inline-block mx-auto">
        <v-container>
          <v-row>
            <v-col class="font-weight-regular title">
              {{ this.getComicData.title}}
            </v-col>
          </v-row>  
          <v-row>
            <v-col>
              <v-img aspect-ratio="1.4"
                :src="this.getComicData.cover" >
              </v-img>
            </v-col>
            <v-col>
              <v-row class="font-weight-light body-2 justify-center">
                <v-col>  
                  {{ this.getComicData.description}}
                </v-col>
              </v-row>
              <v-row>
                <v-col>  
                  {{ this.getComicData.price}}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="show=false">Disagree</v-btn>
              <v-btn color="green darken-1" text @click="show=false">Agree</v-btn>
            </v-card-actions>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DetailComic',
  props: ['visible', 'selectedComic'],
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('closeDetail')
        }
      }
    },
    getComicData () {
      let comicData = {}
      if (Object.entries(this.selectedComic).length != 0) {
        comicData = {
          "title": this.selectedComic.title,
          "description": this.selectedComic.description,
          "cover": `${this.selectedComic.thumbnail.path}.${this.selectedComic.thumbnail.extension}`,
          "price": `${this.selectedComic.prices[0].price}$`
        }      
      }
      return comicData
    }
  }
}
</script>