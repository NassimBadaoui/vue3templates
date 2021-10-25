<template>
        <span v-bind:title="title"></span>
        <p> {{ message }} </p>
        <input v-model="inputField" placeholder="Saisissez un code UF">
        <button v-on:click="callServer">OK</button>
        <p> {{ processingMessage }} {{ serverResult }} </p>

          <table class="table">
            <thead>
              <tr>
                <th>INDEX</th>
                <th>ID_UF</th>
                <th>CODE_UF</th>
                <th>LIB_UF</th>
                <th>CODE_SERVICE</th>
                <th>LIB_SERVICE</th>
                <th>CODE_CLINIQUE</th>
                <th>LIB_CLINIQUE</th>
                <th>CODE_POLE</th>
                <th>LIB_POLE</th>
                <th>ANNUL_UF</th>
                <th>AMBU_UF</th>
                <th>CHAMP_APP</th>
              </tr>
            </thead>
            <tbody>
              <tr class = "data" v-for="(tab, index) in tabs" :key="index">
                  <td>{{index+1}}</td>
                  <td>{{tab.ID_UF}}</td>
                  <td>{{tab.CODE_UF}}</td>
                  <td>{{tab.LIB_UF}}</td>
                  <td>{{tab.CODE_SERVICE}}</td>
                  <td>{{tab.LIB_SERVICE}}</td>
                  <td>{{tab.CODE_CLINIQUE}}</td>
                  <td>{{tab.LIB_CLINIQUE}}</td>
                  <td>{{tab.CODE_POLE}}</td>
                  <td>{{tab.LIB_POLE}}</td>
                  <td>{{tab.ANNUL_UF}}</td>
                  <td>{{tab.AMBU_UF}}</td>
                  <td>{{tab.CHAMP_APP}}</td>
              </tr>
            </tbody>
          </table>

  

</template>

<script>
export default {
  name: "Bonsai",
    data(){
        return {
          
                title: 'Page de test Structure',
                message: "Bienvenue sur la page de test d'interrogation de la structure",
                inputField: "",
                serverResult: "",
                processingMessage: "",
                tabs : []
            
       }

    },  
  
  created(){
       this.axios.get('https://opentdb.com/api.php?amount=1&category=18')
                  .then((response) => {
                      console.log(response.data)
                  })
  }, 
  methods : {

    callServer: function() { 
      this.axios.get(`http://vlp042chr:3000/api/bonsai/?code_uf=${this.inputField}`, { crossdomain: true })
                  .then(response => {
          this.tabs.push(response.data);
          console.log(response); 
          console.log(this.tabs); 
          return response;
          }).catch(error => {
                console.log(error.response)
          })
              }

  }
};
</script>

<style>
</style>