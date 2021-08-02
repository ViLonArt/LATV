const Home = window.httpVueLoader('./components/Home.vue')
const Films = window.httpVueLoader('./components/Films.vue')
const Infos = window.httpVueLoader('./components/Infos.vue')
const MyReservations = window.httpVueLoader('./components/MyReservations.vue')
const Reservations = window.httpVueLoader('./components/Reservations.vue')
const login = window.httpVueLoader('./components/Login.vue')
const register = window.httpVueLoader('./components/Register.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/films/:id_film', component: Reservations },
    { path: '/films', component: Films },
    { path: '/infos', component: Infos },
    { path: '/login', component: login },
    { path: '/register', component: register },
    { path: '/myreservations', component: MyReservations }
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data: {
        films: [],
        user: {
            id: null,
            name: null
        },
        myreservations: [],
    },
    async mounted() {
        const res = await axios.get('api/movies')
        this.films = res.data

        const res2 = await axios.get('api/me')
        this.user = res2.data[0]

        const res3 = await axios.get('api/myreservations')
        this.myreservations = res3.data[0]


    },
    methods: {
        async addMovie(movie) {
            await axios.post('api/addmovie', movie)
        },

        async showSpecificMovie({ id }) {
            await axios.get('api/movies/:id', { id })
        },

        async pickAdmin({ id }) {
            await axios.get('api/admin', { id })
        },

        async loginAccount({ email, password }) {
            await axios.post('/api/login', { email, password })
                .then(() => {
                    this.$router.push('/')
                })
                .catch(() => {
                    this.$router.push('/login')
                })
        },
        async registerAccount({ name, email, password }) {
            await axios.post('/api/register', { name, email, password })
                .then(() => {
                    this.$router.push('/login')
                })
                .catch(() => {
                    this.$router.push('/register')
                })
        },

        async logout() {
            await axios.post('api/logout')
        },

        async cancelPay({ id }) {
            await axios.delete('api/cancelMyReservation', { id })
                .then(() => {
                    alert("Séance annulé. Nous ne remboursons pas !")
                })
                .catch(() => {
                    alert("Nous n'avons pas pu annulé votre séance.")
                })
        }

        /** Pour servir d'exemple
        async panierPay() {
            await axios.post('/api/panier/pay')
                .then(() => {
                    this.$router.push('/panier/pay')
                })
                .catch(() => {
                    this.$router.push('/login')
                })
        },
        async loginAccount({ email, password }) {
            await axios.post('/api/login', { email, password })
                .then(() => {
                    this.$router.push('/')
                })
                .catch(() => {
                    this.$router.push('/login')
                })
        },
        async registerAccount({ email, password }) {
            await axios.post('/api/register', { email, password })
                .then(() => {
                    this.$router.push('/login')
                })
                .catch(() => {
                    this.$router.push('/register')
                })
        },
        async addToPanier(articleId) {
            const res = await axios.post('/api/panier', { articleId, quantity: 1 })
            this.panier.articles.push(res.data)
        },
        async removeFromPanier(articleId) {
            const res = await axios.delete('/api/panier/' + articleId)
            const idx = this.panier.articles.findIndex(a => a.id === articleId)
            this.panier.articles.splice(idx, 1)
        },
        async changeQuantity({ articleId, quantity }) {
            const res = await axios.put('/api/panier/' + articleId, { quantity })
            const article = this.panier.articles.find(a => a.id === articleId)
            article.quantity = quantity
        },
        async addArticle(article) {
            const res = await axios.post('/api/article', article)
            this.articles.push(res.data)
        },
        async updateArticle(newArticle) {
            await axios.put('/api/article/' + newArticle.id, newArticle)
            const article = this.articles.find(a => a.id === newArticle.id)
            article.name = newArticle.name
            article.description = newArticle.description
            article.image = newArticle.image
            article.price = newArticle.price
        },
        async deleteArticle(articleId) {
            await axios.delete('/api/article/' + articleId)
            const index = this.articles.findIndex(a => a.id === articleId)
            this.articles.splice(index, 1)
        }
        */
    }

})