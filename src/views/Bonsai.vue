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
  created(){
       this.axios.get('https://opentdb.com/api.php?amount=1&category=18')
                  .then((response) => {
                      console.log(response.data)
                  })
  } 
  
};
</script>

<style>
</style>