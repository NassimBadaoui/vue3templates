<template>
  <table class="table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Date</th>
        <th>Titre</th>
        <th>Detail</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(donnee, index) in donnees" :key="index">
          <td>{{index+1}}</td>
          <td>{{donnee.date}}</td>
          <td>{{donnee.titre}}</td>
          <td>{{donnee.detail}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Bonsai",
  data() {
    return {
                donnees:[
                    { date : "22/08/1966", titre : "Star Wars", detail : "Un detail comme un autre"},
                    { date : "24/04/1986", titre : "Star Wars", detail : "Un detail comme un autre"},
                    { date : "27/10/1946", titre : "Star Wars", detail : "Un detail comme un autre"},
                    { date : "28/11/1936", titre : "Star Wars", detail : "Un detail comme un autre"},
                    { date : "29/12/1926", titre : "Star Wars", detail : "Un detail comme un autre"},
                    { date : "22/02/1916", titre : "Star Wars", detail : "Un detail comme un autre"},
                    { date : "14/09/1996", titre : "Star Wars", detail : "Un detail comme un autre"},
                    { date : "12/08/1906", titre : "Star Wars", detail : "Un detail comme un autre"},
                    { date : "23/07/1936", titre : "Star Wars", detail : "Un detail comme un autre"},
                        ]  
            }   
  },
  methods : {
    callServer: function(){
      this.processingMessage = `Recherche en cours sur http://localhost:3000/structure/${this.inputField}`;
      fetch(`http://localhost:3000/structure/${this.inputField}`)
      .then(response => response.json()
      .then(res))
    }
  }
};
</script>

<style>
</style>