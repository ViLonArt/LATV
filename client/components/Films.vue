<template>
<div>
  <div>
    <div>
      <h2>Nos films</h2>
      <div class="row">
      <article class="column" v-for="film in films" :key="film.id">
        <button  @click="Reservation(film.id)">
          <img  class="film-img" :src="film.image" />
          <div class="film-content">
            <div class="film-title">
              <h2>{{ film.name }}</h2>
            </div>
            <p>{{ film.description }}</p>
          </div>
        </button>
      </article>
      </div>
    </div>
    <div v-if="user.id==1">
      <button @click="showForm = !showForm">Ajouter un film</button>
    <add-movie
      :show="showForm"
      @add-movie="addMovie"
    ></add-movie>
    </div>
   </div>
  </div>
</template>



<script>
const AddMovie = window.httpVueLoader('./components/AddMovie.vue')
module.exports = {
  components:{
    AddMovie
  },
  props : ['films','user'],
  data() {
    return{
      showForm: false,
    }
  },
    methods : {
      Reservation(film_id) {
        this.$router.push('/films/'+film_id)
    },
    addMovie(film){
      this.$emit('add-movie', film)
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
height: 500px;
width: 300;
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