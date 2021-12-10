
<template>
  <div>
    <Header/>
    
    <div class="row" id="box">
      <!-- skilaboð í bið, nær bara í öll skilaboð sem á eftir að svara og gefur fram tölu, hægt er að úta á þennan takka til að fara á skilaboðasíðu-->
      <div class="message-box" v-on:click="routeToMessages()">
        <div id="caption">
          {{messages.length}}
        </div>
        <h1 id="caption"> Skilaboð í bið </h1>
      </div>
      <!-- notendur í bið, nær bara í alla notendur sem á eftir að auðkenna og gefur fram tölu, hægt er að ýta á þennan takka til að fara á notendasíðunna -->
      <div class="user-box" id="box" v-on:click="routeToUsers()">
        <div id="caption">
          {{users.length}}
        </div>
        <h1 id="caption"> Notendur í bið </h1>
      </div>
    </div>
    
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import axios from 'axios';


export default {
  name: 'Home',
  components: {
    Header,

  },
  data(){
    return{
      users: null,
      messages: null,
      messageloading:true,
      messageerrored: false,
      userloading: true,
      usererrored: false,
    }
  },
  mounted () {
    // náum í öll active skilaboð, active þýðir á eftir að svara þeim.
    axios
      .get('http://localhost:3000/api/v1/messages/active')
      .then(response => {
        console.log(response.data)
        this.messages = response.data
      })
      .catch(error => {
        console.error(error);
        this.messageerrored = true
      })
      .finally(() => this.messageloading = false)
      // náum í alla notendur sem eru pending, pending þýðir á eftir að auðkenna og notandi er búinn að setja inn gögnin sín.
      axios
        .get('http://localhost:3000/api/v1/users/pending')
        .then(response => {
          console.log(response.data)
          this.users = response.data
          this.sortusers = response.data
        })
        .catch(error => {
          console.error(error);
          this.errored = true
        })
        .finally(() => this.loading = false)
  },
  methods: {
    // einfaldur router fyrir bæði notendur og skilaboð
    routeToUsers(){
      this.$router.replace({name: "users"})
    },
    routeToMessages(){
      this.$router.replace({name: "messages"})
    }

  }
  
  
}
</script>


<style scoped>
.row {
  height: 94vh;
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-items: center;
  background-color: #30363D;
}
.message-box {
  display: flex;
  background-image: linear-gradient(to right, #F27A54, #A154F2);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 60%;
  margin: 10px;
  border-radius: 25px;
  filter: drop-shadow(5px 5px 5px black);
  cursor: pointer;
}

.user-box {
  display: flex;
  background-image: linear-gradient(to right, #F27A54, #A154F2);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 60%;
  margin: 10px;
  border-radius: 25px;
  filter: drop-shadow(5px 5px 5px black);
  cursor: pointer;
}

#caption {
  font-family: Montserrat;
  font-size: 400%;
  padding: 0 auto;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 0px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to right, white, #FAF9F6);
}
</style>
