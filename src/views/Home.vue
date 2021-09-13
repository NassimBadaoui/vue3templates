<template>
 <div>
        <h2>{{titre}}</h2>
        <p>{{sousTitre}}</p>
    </div>
</template>

<script>
export default {
    name : 'Home',
      data() {
                return {
                    titre: 'Ma première application Vue 3',
                    sousTitre: '... en trois minutes chrono !'
                }
        }
}
</script>

<style>

</style>