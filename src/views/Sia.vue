<template>
        <span v-bind:title="title"></span>
        <p> {{ message }} </p>
        <input v-model="inputField" placeholder="Saisissez un code UF">
        <button v-on:click="callServer">GET</button>
        <button v-on:click="post">POST</button>
        <button v-on:click="put">PUT</button>
        <button v-on:click="del">DELETE</button>
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
//import formJson from './fichier.json'


export default {
  name: "Bonsai",
    data(){
        return {
          
                title: 'Page de test Structure',
                message: "Bienvenue sur la page de test d'interrogation de la structure",
                inputField: "",
                serverResult: "",
                processingMessage: "",
                tabs : [],
                form : {
                  util : "huihe",
                  equipe : "xererD"
                  
                }
               
            
       }

    },  
  
  created(){
       //this.axios.get('https://opentdb.com/api.php?amount=1&category=18')
       this.axios.get('http://localhost:3000/api/sia/')
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
              },
              post: function() { 
            
      /*this.axios.post(`http://localhost:3000/api/sia/`, conDesc , { crossdomain: true })
                  .then(response => {
          this.tabs.push(response.data);
          console.log(response); 
          console.log(this.tabs); 
          return response;
          }).catch(error => {
                console.log(error.response)
          })

        var optionAxios = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

        console.log(form);

      
        /*
        let formData = new FormData();

        formData.append('util', 'name');
        formData.append('equipe', 'date');

       var items = {};
                      items["util"]="some value";
                      items["equipe"]="some other value";
                      const jsonString = JSON.stringify(Object.assign({}, items)) 
                      const json_obj = JSON.parse(jsonString);
                      console.log(json_obj);*/

       
          //var optionAxios = { headers: { 'content-type': 'text/json' } };
          this.axios.post(`http://localhost:3000/api/sia/`, this.form) //, optionAxios)
                .then(response => {
                    console.log(response);

                }).catch(error => {
                console.log(error.response)
                })

             
                  /*fetch(`http://localhost:3000/api/sia/`, 
                        {method: 'POST', body: formData})
                    //.then(res => res.json())
                    .then(response => {
                    console.log(response);

                }).catch(error => {
                console.log(error.response)
                })*/
              }, 

              del: function() {
                var optionAxios = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
                this.axios.delete(`http://localhost:3000/api/sia/?util=jkj`, optionAxios)
                .then(response => {
                    console.log(response);

                }).catch(error => {
                console.log(error.response)
                })
               },
              put: function() { 
                this.axios.put(`http://localhost:3000/api/sia/`, this.form)
                .then(response => {
                    console.log(response);

                }).catch(error => {
                console.log(error.response)
                })
              }

  }

   
};
</script>

<style>
</style>