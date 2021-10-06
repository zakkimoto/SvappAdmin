
<template>
  
  <div class ="container">
    <div class ="row-1">
      <Header/> 
    </div>
    <div class ="row-2">
      <div class ="col-1">
        <h1 id = "texthvitur">LEITA</h1>
        <input type="text" placeholder="TEXTI" id="input"/>


        <input type="checkbox" id="checkbox-1" name="vehicle1" value="verified">
        <label for="vehicle1"> Búið að auðkenna </label>
        <input type="checkbox" id="checkbox-2" name="vehicle2" value="pending">
        <label for="vehicle2"> Auðkenning í bið </label>
        <input type="checkbox" id="checkbox-3" name="vehicle3" value="not-verified">
        <label for="vehicle3"> Ekki búið að auðkenna </label>

        <input type="radio" id="paid" name="radio-1" value="paid">
        <label for="active">Búinn að borga</label>
        <input type="radio" id="notpaid" name="radio-1" value="notpaid">
        <label for="notactive">Ekki búið að borga</label>


        <input type="radio" id="active" v-model="active" name="radio-2" value="active">
        <label for="active">Virkur</label>
        <input type="radio" id="notactive" name="radio-2" value="notactive">
        <label for="notactive">Ekki Virkur</label>
      
        <button type="button" id="input">LEITA</button>
        <button type="button" id="input">HREINSA</button>

      </div>
      <div class ="col-2">
        <h1>Col2</h1>
      </div>
    </div>

   
    
  </div>
</template>

<script>
import Header from './Header.vue'

export default {
  name: 'Users',
  components: {
    Header
  },
  
  
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
  height: 93vh;
  background-color: #747D88;
  align-items: center;
  
}
.col-2{
  width: 70%;
  height: 93vh;
  background-color: #30363D;

}
</style>
