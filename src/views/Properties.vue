
<template>
  <div>
      <!-- hér er google maps fyrir allar eignir, hægt er að sjá að ég er með marker þarna inni, ég á í raun bara eftir að tengjast stærri gagnagrunni -->
      <!-- og þá get ég sett upplýsingar af húsin inní markerinn sjálfann -->
    <Header />
    <GmapMap
                id="Map"
                :center="this.center"
                :zoom="4"
                map-type-id="terrain"
                style="width: 100%; height: 94vh;"
                >
                <GmapMarker
                    :key="index"
                    v-for="(m, index) in marker"
                    :position="{lat: m.lat, lng: m.lng}"
                    :clickable="true"
                    :draggable="true"
                    @click="center=m.position"
                />
                </GmapMap> 
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import axios from 'axios';

export default {
  name: "Properties",
  components: {
    Header,
  },
  data() {
    return {
      properties: null,
      marker: [],
      center:{
          lat:65, lng:10,
          },
    };
  },
  // náum í allar eignir frá gagnagrunni
  mounted(){
      axios
        .get('http://localhost:3000/api/v1/properties/all')
        .then(response => {
            this.properties = response.data
            console.log(this.properties)
            // for loop er þarna til þess að fara í gegnum allar eignir svo við skráum allar eignir sem koma upp hjá okkur inná kortið
            for (let i = 0; i < this.properties.length; i++){
                console.log(response.data[i].street_name)
                axios
                    .get('https://maps.googleapis.com/maps/api/geocode/json?address=,' + response.data[i].street_name+ ' ' + response.data[i].street_name + ' Iceland&key=AIzaSyDImhMtVnZfl8Iim3YJqTbZLsHYs75NuLg')
                    .then(response =>{
                        console.log(response.data.results[0].geometry.location.lat)
                        // ef að long og lat eru ekki undefined þá bætum við þessari eign við listan okkar í data() sem kallast marker
                        if(response.data.results[0].geometry.location.lat != undefined){
                            this.marker.push({
                            lat: response.data.results[0].geometry.location.lat, 
                            lng: response.data.results[0].geometry.location.lng

                        })
                        }else{
                            console.log("address not valid")
                        }
                        
                    })
                    .catch(error => {
                        console.log(error)
                    })


                
                console.log(this.marker.lat)
                
               
                
                
            }

        })
        .catch(error => {
            console.error(error);
        })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
