<template>
        <span v-bind:title="title"></span>
        <p> {{ message }} </p>
        <input v-model="inputField" placeholder="Saisissez un code UF">
        <button v-on:click="callServer">OK</button>
        <p> {{ processingMessage }} {{ serverResult }} </p>
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
                tab : []
            
       }

    },  
  
 methods: {
                callServer: function () {
                    console.log("tot");
                    this.processingMessage = `Recherche en cours sur http://vlp042chr:3000/api/bonsai/?code_uf=${this.inputField}`;
                    fetch(`http://localhost:8080/api/bonsai/`)
                      .then(response => console.log(response.json()))
                        /*.then(response => response.json())
                        .then(response => {
                            if ( Object.keys(response).length > 0 ) {
                              console.log("Zooooo");
                                this.serverResult = JSON.stringify(response)
                            }
                            else {
                                this.serverResult = "Aucune structure correspondante trouvée"
                            }
                            this.processingMessage = ""
                        })*/
                        .catch(error => alert("Erreur : " + error ));
                }
                
            }
};
</script>

<style>
</style>