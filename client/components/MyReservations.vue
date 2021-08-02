<template>
<div>
    <div>
      <h2>Mes Réservations</h2>
      <article v-for="film in myreservations" :key="film.id">
        <img :src="film.image" />
        <div class="film-content">
          <div class="film-title">
            <h2>{{ film.name }}</h2>
          </div>
          <p>{{ film.description }}</p>
        </div>
        <button  @click="cancelPay(film.id)">Annuler la réservation</button>
      </article>
    </div>
  </div>
</template>
<script>
module.exports = {
    props : ['myreservations'],
    methods : {
      cancelPay(film_id){
        this.$emit("cancel-pay", film_id)
      }
  }
}
</script>