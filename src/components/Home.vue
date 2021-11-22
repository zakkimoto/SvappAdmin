
<template>
  <div>
    <Header/>
    <div class="row" id="box">
      <div class="user-box">
        {{users.length}}
      </div>
      <div class="message-box" id="box">
      {{messages.length}}
      </div>
    </div>
    
  </div>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Header
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
  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  flex-direction: row;
  width: 40%;
  height: 60%;
  margin: 10px;
  border-radius: 25px;
  filter: drop-shadow(5px 5px 5px black);
}

.user-box {
  display: flex;
  background-image: linear-gradient(to right, #F27A54, #A154F2);
  flex-direction: row;
  width: 40%;
  height: 60%;
  margin: 10px;
  border-radius: 25px;
  filter: drop-shadow(5px 5px 5px black);
}
</style>
