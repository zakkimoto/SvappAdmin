
<template>
  
  <div class ="container">
    <div class ="row-1">
      <Header/> 
    </div>
    <div class ="row-2">
      <div class ="col-1">
        
        <h1 id = "texthvitur">LEITA</h1>
        
        
        <input type="text" v-model="search" placeholder="TEXTI" id="input"/>


        <input type="radio" v-model="verified" id="checkbox-1" name="radio-3" value="1">
        <label for="vehicle1"> Búið að auðkenna </label>
        <input type="radio" v-model="verified" id="checkbox-2" name="radio-3" value="0">
        <label for="vehicle2"> Auðkenning í bið </label>
        <input type="radio" v-model="verified" id="checkbox-3" name="radio-3" value="-1">
        <label for="vehicle3"> Ekki búið að auðkenna </label>

        <input type="radio" id="paid" v-model="paid" name="radio-1" value="true">
        <label for="active">Búinn að borga</label>
        <input type="radio" id="notpaid" v-model="paid" name="radio-1" value="false">
        <label for="notactive">Ekki búið að borga</label>


        <input type="radio" id="active" v-model="active" name="radio-2" value="true">
        <label for="active">Virkur</label>
        <input type="radio" id="notactive" v-model="active" name="radio-2" value="false">
        <label for="notactive">Ekki Virkur</label>
      
        <button type="button" id="input" v-on:click="filter()">LEITA</button>
        <button type="button" id="input" v-on:click="clear()">HREINSA</button>
        <SvappAnimation id="svapp-animation"/> 

      </div>
      <div class ="col-2">
        <div class = "userbox" v-for="u in filtered_users" :key="u.svapp_user_id" v-on:click="routeToUser(u.svapp_user_id)">
          <!-- senda user ID áfram á næstu síðu þegar ég er að fara routa á clickið {{u.user_name.split(",").splice(1)}} -->
          
          {{u.user_name.replace(")", "").replace("(", "").split(",")[1] + " " + u.user_name.replace(")", "").replace("(", "").split(",")[3]}}
          <img v-bind:src="u.image_url" id="profile-photo" width=70% height=70% alt="Mynd ekki fundin">
          {{u.email}}
          <div class="not-verified" v-if="u.verified == -1">
          </div>
          <div class="pending-verified" v-if="u.verified == 0">
          </div>
          <div class="active-verified" v-if="u.verified == 1">
          </div>
          
        </div>
      </div>
    </div>

   
    
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import axios from 'axios';
import SvappAnimation from '../components/SvappAnimation.vue'


export default {
  name: 'Users',
  components: {
    Header,
    SvappAnimation,
  },
  data(){
    return{
      search: "",
      users: null,
      filtered_users: null,
      loading: true,
      errored: false,
      verified: null,
      active: null,
      paid: null,
    }
  },
  methods: {
    routeToUser(id) {
      this.$router.push({ name: 'user', params: { id: id } })
    },
    filter() {
      this.filtered_users =  this.users.filter(user => user.user_name.includes(this.search) || user.email.includes(this.search))
      if(this.verified !== null){
        this.filtered_users = this.filtered_users.filter(user  => user.verified == this.verified)
      }
      if(this.active !== null){
        console.log(this.active);
        if(this.active == "true"){
          console.log("2")
          this.filtered_users = this.filtered_users.filter(user => user.active)
        }else{
          console.log("her")
          this.filtered_users = this.filtered_users.filter(user => !user.active)
        }
      }
      if(this.paid !== null){
        if(this.paid == "true"){
          this.filtered_users = this.filtered_users.filter(user => user.paid)
        }else{
          this.filtered_users = this.filtered_users.filter(user => !user.paid)
        }
      }
        
      
      console.log(this.filtered_users);
    },
    clear(){
      this.filtered_users = this.users;
      this.verified = null;
      this.active = null;
      this.paid = null;
      this.search = "";
    }
  },

  mounted () {
      axios
        .get('http://localhost:3000/api/v1/users')
        .then(response => {
          console.log(response.data)
          this.users = response.data
          this.filtered_users = this.users
        })
        .catch(error => {
          console.error(error);
          this.errored = true
        })
        .finally(() => this.loading = false)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 
.row-2 {
  background-color: yellow;
  display:flex;
  
}

.row-2 div{
  border: 1px solid black;
  
}-->
<style scoped>

#svapp-animation{
  padding-top: 10%;
}

#profile-photo{
  width: 70%;
  height: 70%;
  border-radius: 50%;
  margin: auto;
}

.active-verified{
  height: 25px;
  width: 25px;
  background-color: #6FCF97;
  border-radius: 50%;
}

.pending-verified{
  height: 25px;
  width: 25px;
  background-color: #F27A54;
  border-radius: 50%;
}

.not-verified{
  height: 25px;
  width: 25px;
  background-color: #30363D;
  border-radius: 50%;
}

.userbox{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 220px;
  background-color: #DB7082;
  border-radius: 25px;
  margin: 15px auto;
  overflow-y: scroll;
}
#texthvitur{
  color: white;
}
#input{
  width: 70%;
  border-radius:4px;
  margin:8px auto;
  outline:none;
  padding:8px;
  box-sizing:border-box;
  transition:.3s;
}

#input:focus{
  border-color:#A154F2;
  box-shadow:0 0 8px 0 #A154F2;
}

.container{
  display:flex;
  justify-content: flex-end;
  flex-direction: column;
  font-family: Montserrat;
}



.row-2{
  display:flex;
  flex-direction: row;
}

.col-1{
  display:flex;
  flex-direction: column;
  border: 4px black;
  width: 30%;
  height: 94vh;
  background-color: #747D88;
  align-items: center;
  
}
.col-2{
  display:flex;
  justify-content: start;
  flex-direction: row;
  align-items: start;
  flex-wrap: wrap;
  width: 70%;
  height: 94vh;
  background-color: #30363D;
  overflow-y: scroll;

}
</style>
