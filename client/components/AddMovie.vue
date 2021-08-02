<template>
    <form v-show="show" @submit.prevent="addMovie">
        <h2>Nouveau film à ajouter</h2>
        <input type="text" v-model="newMovie.name" placeholder="Nom du film" required>
        <textarea type="text" v-model="newMovie.description" required></textarea>
        <input type="date" v-model="newMovie.date" placeholder="yyyy-mm-dd">
        <input type="text" v-model="newMovie.image" placeholder="Lien vers l'image">
        <button type="submit">Ajouter</button>
    </form>
</template>
 
<script>
module.exports = {
  props: {
    show: Boolean
  },
  data () {
    return {
        newMovie: {
            name: '',
            description: '',
            date: '',
            image: '',
        }
    }
  },
  methods: {
    addMovie () {
        this.$emit('add-movie', this.newMovie)
    },
  }
}
</script>
 
<style>
</style>
