<template>
    <div>
    <article>
      <div class="film-img">
        <img :src="film.image"/>
      </div>
      <div class="film-date">
        <div class="film-content">
          <div class="film-title">
            <h2>{{ film.name }}</h2>
          </div>
          <p>{{ film.description }}</p>
        </div>
          <button>{{ convertDate(new Date(film.date))}}</button>
      </div>
    </article>
    <div>
      <button  @click="Payer()">Acheter un billet</button>
    </div>
  </div>
</template>

<script>
module.exports = {
    props : {
      films: { type: Array, default: []},
      user: []
    },
    data () {
      return {
        film: this.films.find(a => a.id == this.$route.params.id_film)
      }
    },
    methods : {
      convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
      }
    },
    watch: {
      films: function() {
        this.film = this.films.find(a => a.id == this.$route.params.id_film)
      }
    },
}
</script>