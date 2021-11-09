<template>
  <div>
    <Header/>
  <div class="col-1">
    <h2>{{this.user[0].user_name.replace(")", "").replace("(", "").split(",")[1] + " " + this.user[0].user_name.replace(")", "").replace("(", "").split(",")[3]}}</h2>
    
    <div v-if="this.user[0].verified == 1">
            <img v-bind:src="this.user[0].image_url" id="profile-photo" alt="Mynd ekki fundin">
            <h2>{{this.user[0].user_name.replace(")", "").replace("(", "").split(",")[1] + " " + this.user[0].user_name.replace(")", "").replace("(", "").split(",")[3]}}</h2>
            <h2>{{this.user[0].email}}</h2>

    </div>
    
    <div v-if="this.user[0].verified != 1">
    <img v-bind:src="this.user[0].p_document" id="id_document" width=40% height=40% alt="Mynd ekki fundin">
    <img v-bind:src="this.user[0].a_document" id="utilitybill" width=40% height=40% alt="Mynd ekki fundin">
    <button v-on:click="verify()" type="button">samþykkja notanda</button>
    </div>  

  </div>
 
    

    
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
  methods: {
      verify(){
          console.log("hérna" + this.url_data);
          axios.put('http://localhost:3000/api/v1/users/verified/' + this.url_data)
          .then(response => {
              console.log(response.data)
          })
          .catch(error =>{
              console.error(error);
          })
          .finally(()=> this.$router.replace({name: "users"}))

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
<style scoped>

    #profile-photo{
        height: 100%;
        width: 30%;
    }

    .row-1{
        width: 100%;
        height: 50%;
    }

    .col-1{
        height: 93vh;
        width: 100%;
        margin: 0;
        padding: 0;
        
    }
 

  
    
</style>

