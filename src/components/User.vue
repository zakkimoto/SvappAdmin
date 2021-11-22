<template>
  <div>
    <Header/>
  <div class="col-1">
    <div class="user-box">
        <div class="user-img-name">
            
            <img v-bind:src="this.user[0].image_url" id="profile-photo" alt="Mynd ekki fundin">
            <h2 id="text">{{this.user[0].user_name.replace(")", "").replace("(", "").split(",")[1] + " " + this.user[0].user_name.replace(")", "").replace("(", "").split(",")[3]}}</h2>
            
        </div>
        <div class="user-verified" v-if="this.user[0].verified == 1">
            <div id="text2">
                <h2>Netfang: {{this.user[0].email}}</h2>
                <h2>Kennitala: {{this.user[0].user_ssn}}</h2>
                <h2>Sími: {{this.user[0].phone}}</h2>
                <h2>Stig: {{this.user[0].guest_points}}</h2>
            </div>

        </div>
        
        <div v-if="this.user[0].verified == 0">
            <div class="id-photos">
                <img v-bind:src="this.user[0].p_document" id="id_document" width=40% height=40% alt="Mynd ekki fundin">
                <img v-bind:src="this.user[0].a_document" id="utilitybill" width=40% height=40% alt="Mynd ekki fundin">
            </div>
            <div class="approve-button">
                <button v-on:click="verify()" type="button">samþykkja notanda</button>
            </div>
        </div>  
        <div v-if="this.user[0].verified == -1">
            <h2 id="text2">þessi notandi er ekki búinn að hlaða inn skjölum</h2>
        </div>
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

    

    #text {
        font-family: Montserrat;
        font-size: 300%;
        margin-bottom: 0px;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-image: linear-gradient(to right, white, #FAF9F6);
        
    }
    #text2 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        margin-top: 10%;
        padding-left: 10%;
        font-family: Montserrat;
        font-size: 100%;
        margin-bottom: 0px;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-image: linear-gradient(to right, white, #FAF9F6);
        
        
    }

    .row-1{
        width: 100%;
        height: 50%;
    }

    .col-1{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #30363D;
        height: 94vh;
        width: 100%;
        margin: 0;
        padding: 0;
        
    }

    #profile-photo{
        width: 300px;
        height: 300px;
        border-radius: 50%;
        margin: 10px;
        
    }

    .user-box{      
        display: flex;
        flex-direction: column;
        border-radius: 25px;
        width: 98%;
        height: 98%;
        background-color: #DB7082;
    }
 

    .user-img-name{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    
</style>

