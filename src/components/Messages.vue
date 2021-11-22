
<template>
  <div class="container">
    <div class="row-1">
      <Header/>
    </div>
    <div class="row-2">
      <div class="col-1" v-for="m in messages" :key="m.id">
        <div class="message-box">
          {{m.id}}
        </div>
      </div>
      
      <div class="col-2">
        <div class="col-3">
          <h1>Zakarías Friðriksson</h1>
          
        </div>
        <div class="col-4">
          <h1>haha</h1>
        </div>
        <div class="col-5">
          <input type="text" placeholder="TEXTI" id="input"/>
          <button type="button" id="button">Senda</button>
          
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios';

export default {
  name: 'Messages',
  components: {
    Header
  },
  data(){
    return{
      messages: null,
      loading: true,
      errored: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/api/v1/messages')
      .then(response => {
        console.log(response.data)
        this.messages = response.data
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

.message-box{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  
}

#input{
  width: 90%;
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

#button{
  width: 10%;
  border-radius:4px;
  margin:8px auto;
  outline:none;
  padding:8px;
  box-sizing:border-box;
  transition:.3s;
}

#button:focus{
  border-color:#A154F2;
  box-shadow:0 0 8px 0 #A154F2;
}


.container{
  display:flex;
  justify-content: flex-start;
  flex-direction: column;
  font-family: Montserrat;
}

.row-2{
  display:flex;
  flex-direction: row;
  
}

.col-1{
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex-wrap: wrap;
  flex: 1;
  width: 20px;
  height: 94vh;
  background-color: #747D88;
  justify-content:start;
  align-items: center;

  
}
.col-2{
  display:flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 94vh;
  background-color: #30363D;
  

}

.col-3{
  width: 100%;
  display:flex;
}

.col-4{
  height: 90%;
  width: 100%;
  display:flex;
  
}
.col-5{
  
  width: 100%;
  display:flex;
  align-items: end;
  justify-content: end;
  
  
  
}

</style>
