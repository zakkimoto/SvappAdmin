
<template>
  <div class="container">
    <div class="row-1">
      <Header />
    </div>
    <div class="row-2">
      <div class="col-1">
        <div v-for="m in messages" :key="m.id">
          <div class="message-box" v-on:click="switch_message(m.id)">
            <div id="answered" v-if="m.done">
              {{ m.email }}
            </div>
            <div id="notanswered" v-else>
              {{ m.email }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-2">
        <div class="col-3">
          <h1>{{ message_in_focus.question }}</h1>
        </div>
        <div class="col-4">
          <h1>{{ message_in_focus.answer }}</h1>
        </div>
        <div class="col-5">
          <input type="text" placeholder="TEXTI" v-model="answer" id="input" />
          <button type="button" id="button" v-on:click="send_answer()">
            Senda
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import axios from "axios";


export default {
  name: "Messages",
  components: {
    Header,
  },
  data() {
    return {
      messages: null,
      loading: true,
      errored: false,
      message_in_focus: null,
      answer: null,
      users: null,
    };
  },
  methods: {
    switch_message(message_id) {
      this.answer = null;
      this.message_in_focus = this.messages.find(
        (message) => message.id == message_id
      );
    },
    send_answer() {
      if (this.answer !== null) {
        this.message_in_focus.answer = this.answer;
        axios
          .patch(`http://localhost:3000/api/v1/messages/${this.message_in_focus.id}`, {
            answer: this.answer
          })
          .then((response) => {
            this.messages = response.data;
            this.message_in_focus =
              this.messages.length > 0 ? this.messages[0] : null;
            this.$router.go(0)
          })
          .catch((error) => {
            console.error(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      }
    
    

    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/v1/messages")
      .then((response) => {
        this.messages = response.data;
        console.log(this.messages)
        this.message_in_focus =
          this.messages.length > 0 ? this.messages[0] : null;
      })
      .catch((error) => {
        console.error(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
        
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#notanswered{
  background-color: green;
  width: 100%;
}

#answered{
  background-color: red;
  width: 100%;
}

.message-box {
  display: flex;
  height: 50px;
  width: 200px;
  margin:0px;
  justify-content: center;
  align-items: start;

}

#input {
  width: 90%;
  border-radius: 4px;
  margin: 8px auto;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}

#input:focus {
  border-color: #a154f2;
  box-shadow: 0 0 8px 0 #a154f2;
}

#button {
  width: 10%;
  border-radius: 4px;
  margin: 8px auto;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}

#button:focus {
  border-color: #a154f2;
  box-shadow: 0 0 8px 0 #a154f2;
}

.container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  font-family: Montserrat;
}

.row-2 {
  display: flex;
  flex-direction: row;
}

.col-1 {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  overflow-y: scroll;
  flex: 1;
  width: 20px;
  height: 94vh;
  background-color: #747d88;
  justify-content: start;
  align-items: center;
  
}
.col-2 {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 94vh;
  background-color: #30363d;
}

.col-3 {
  width: 100%;
  display: flex;
}

.col-4 {
  height: 90%;
  width: 100%;
  display: flex;
}
.col-5 {
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
}
</style>
