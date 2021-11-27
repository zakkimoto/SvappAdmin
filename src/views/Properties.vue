
<template>
  <div>
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
  mounted(){
      axios
        .get('http://localhost:3000/api/v1/properties/all')
        .then(response => {
            this.properties = response.data
            console.log(this.properties)
            for (let i = 0; i < this.properties.length; i++){
                console.log(response.data[i].street_name)
                axios
                    .get('https://maps.googleapis.com/maps/api/geocode/json?address=,' + response.data[i].street_name+ ' ' + response.data[i].street_name + ' Iceland&key=AIzaSyDImhMtVnZfl8Iim3YJqTbZLsHYs75NuLg')
                    .then(response =>{
                        console.log(response.data.results[0].geometry.location.lat)
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
