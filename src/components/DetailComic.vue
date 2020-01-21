
<template>
  <v-row justify="center">
    <v-dialog persistent transition="scale-transition" origin="center center" v-model="show" max-width="1000px">
      <v-card class="d-inline-block mx-auto">
        <v-container>
          <v-row>
            <v-col class="font-weight-regular title">
              {{ this.selectedComic.title}}
              <v-btn icon :color="this.selectedComic.colorFav" @click="setComicfav">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-col>            
          </v-row>  
          <v-row>
            <v-col>
              <v-img aspect-ratio="1.4"
                :src="this.selectedComic.cover" >
              </v-img>
            </v-col>
            <v-col>
              <v-row class="font-weight-light body-2 justify-center">
                <v-col>  
                  {{ this.selectedComic.description}}
                </v-col>
              </v-row>
              <v-row>
                <v-col align="left" justify="left">  
                  {{ this.selectedComic.price}}
                </v-col>           
                <v-col align="right" justify="right">                                                
                    <v-btn color="purple" rounded dark small absolute bottom right @click="show=false">
                        Volver
                    </v-btn>  
                </v-col> 
              </v-row>              
            </v-col>            
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
    }    
  },
  methods: {
    setComicfav() {      
      const isLiked = localStorage.getItem(`comic-fav-${this.selectedComic.id}`)
      let likeValue = isLiked === 'true' ? 'false' : 'true'
      localStorage.setItem(`comic-fav-${this.selectedComic.id}`, likeValue);  
      this.selectedComic.colorFav = isLiked === 'true' ? 'purple' : 'white'
    }
  }
}
</script>