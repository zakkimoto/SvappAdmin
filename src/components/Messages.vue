
<template>
  <div class="container">
    <div class="row-1">
      <Header/>
    </div>
    <div class="row-2">
      <div class="col-1">
        <h1>Hér koma öll skilaboð</h1>
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

export default {
  name: 'Messages',
  components: {
    Header
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
  display:flex;
  flex-direction: column;
  border: 4px black;
  width: 30%;
  height: 93vh;
  background-color: #747D88;
  align-items: center;
  
}
.col-2{
  display:flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 93vh;
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
