<template  class="content">
  <div>
    <h2>Bienvenue</h2>
    <p>Découvrez notre nouvelle salle de cinéma à Villejuif et profitez des meilleurs prix !</p>
    <h2>Nos films l'affiche</h2>
    <div class="row">
    <article class="column" v-for="film in films" :key="film.id">
      <div  v-if="film.Affiche">
        <button  @click="Reservation(film.id)">
          <div>
            <img class="film-img" :src="film.image"/>
          </div>
          <div class="film-title">
            <h2>{{ film.name }}</h2>
          </div>
        </button>
      </div>
    </article>
    </div>
    <h2>Prochainement</h2>
    <div class="row">
    <article class="column" v-for="film in films" :key="film.id">
      <div v-if="film.Prochainement">
        <button  @click="Reservation(film.id)">
          <div >
            <img class="film-img" :src="film.image"/>
          </div>
          <div class="film-title">
            <h2>{{ film.name }}</h2>
          </div>
        </button>
      </div>
    </article>
    </div>
  </div>
</template>



<script>
        
module.exports = {
    components: {},
    props : ['films'],
    methods : {
      Reservation(film_id) {
        this.$router.push('/films/'+film_id)
    },
      showSpecificMovie(film_id){
        this.$emit('show-specific-movie', film_id)
      }
    }
}
</script>

<style>

.film-img {
height: 400px;
width: 285px;
}

.column {
float: left;
height: auto;
padding : 15px;
}

.row {
  display: table-cell;
  content:"";
  clear : both;
}

button:hover {
  cursor: pointer
}

</style>