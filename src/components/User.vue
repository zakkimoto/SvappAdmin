<template>
  <div>
    <Header/>
  <div>
      <h2>{{this.user[0].user_name.replace(")", "").replace("(", "").split(",")[1] + " " + this.user[0].user_name.replace(")", "").replace("(", "").split(",")[3]}}</h2>
      <img v-bind:src="this.user[0].image_url" id="profile-photo" width=40% height=40% alt="Mynd ekki fundin">
      <h2>{{this.user[0].email}}</h2>

  </div>
  <div></div>
    <h1>user {{ $route.params.id }} </h1>
    <h2>{{this.user[0].name_id}}</h2>
    

    
  </div>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios';


export default {
  name: 'User',
  components: {
    Header
  },
  data(){
    return{
      url_data: null,  
      user: null,
      loading: true,
      errored: false,
      username: null,
    }
  },
  //methods: {
    //routeToUser(id) {
      //this.$router.push({ name: 'user', params: { id: id } })
    //}
  //},
  mounted () {
    this.url_data = this.$route.params.id;
    console.log(this.url_data);
    axios
        .get('http://localhost:3000/api/v1/users/'+ this.$route.params.id)
        .then(response => {
        console.log(response.data)
        this.user = response.data
        })
        .catch(error => {
        console.error(error);
        this.errored = true
        })
        .finally(() => this.loading = false)
    
    }
}
</script>

<!-- <h1>user {{ $route.params.id }}</h1>-->
<style scoped></style>

