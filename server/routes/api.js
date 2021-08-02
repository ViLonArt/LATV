const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'MyPassword',
    database: 'Projet'
})

client.connect()

class MyReservation {
    constructor() {
        this.createdAt = new Date()
        this.updatedAt = new Date()
        this.articles = []
    }
}

var currentDate = new Date();
//Route post register
router.post('/register', async(req, res) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    if (await exist(email) === true) {
        res.status(400).json({ message: "Email adress already used" })
    } else {
        const hash = await bcrypt.hash(password, 10)
        insert(name, email, hash)
        res.status(200).json({ message: "successfully signed in" })
    }
})

async function insert(name, email, hash) {
    const sql = "INSERT INTO users(name, email, password) VALUES($1, $2, $3)"
    await client.query({
        text: sql,
        values: [name, email, hash]
    })
}

async function exist(email) {
    const sql = await client.query({
        text: " SELECT COUNT(*) FROM users WHERE email=$1",
        values: [email]
    })
    return parseInt(sql.rows[0].count) === 1
}

//Post Login
router.post('/login', async(req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!(await exist(email) && await correctMdp(email, password))) {

        res.status(400).json({ message: "email adress or password is incorrect" })
    } else {
        if (req.session.userId) {
            res.status(401).json({ message: "User already logged in" })
        } else {
            const sql = await client.query({
                text: "SELECT id FROM users WHERE email=$1",
                values: [email]
            })
            const id = sql.rows[0].id
            req.session.userId = id
            res.status(200).json({ message: "All good" })
        }
    }

})

async function correctMdp(email, password) {
    const sql = await client.query({
        text: "SELECT password FROM users WHERE email=$1",
        values: [email]
    })
    const hash = sql.rows[0].password
    if (await bcrypt.compare(password, hash)) {
        return true
    } else {
        return false
    }
}

// Logout
router.get('/logout', function(req, res, next) {
    req.logout();
    req.session = null;
    res.redirect('/');
});


//route utilisateur connecté

router.get('/me', async(req, res) => {
    if (!req.session.userId) {
        res.status(401).send({ message: "user must be logged in first" })
        return
    } else {
        const sql = await client.query({
            text: "SELECT id, name FROM users WHERE id=$1",
            values: [req.session.userId]
        })
        res.status(200).json(sql.rows)
    }

})

/**
 * Notre mécanisme de sauvegarde des paniers des utilisateurs sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
 */
router.use((req, res, next) => {
    // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
    if (typeof req.session.panier === 'undefined') {
        req.session.panier = new MyReservation()
    }
    next()
})

/*
 * Cette route doit retourner le panier de l'utilisateur, grâce à req.session
 */
router.get('/myReservation', (req, res) => {
    res.json(req.session.MyReservation)
})


/*
 * Cette route doit permettre de confirmer une réservation.
 */
router.post('/Reservations/pay', async(req, res) => {
    if (!req.session.userId) {
        res.status(401).json({ message: 'user not connected' })
        return false
    } else {

        res.send({ message: `Votre séance est bien réservée` })
        const sql = await client.query({
            text: 'INSERT INTO reservation (id, email, date) VALUES ($1, $2, $3)',
            values: [req.session.userID, ]
        })
        return true
    }

})

//Cette route permet de rajouter un film à la BDD
router.post('/addmovie', async(req, res) => {
    const movieName = req.body.movieName
    const description = req.body.description
    const movieDate = req.body.movieDate
    const imageURL = req.body.imageURL

    if (movieDate <= currentDate) {
        res.status(400).json({ message: "You cannot add a movie in the past !" })
        return
    }

    if (typeof(movieDate) != date) {
        res.status(400).json({ message: "Wrong format, use : dd-mm-yyyy" })
    }

    if (isNaN(movieName) || isNaN(description) || isNaN(movieDate) || isNaN(imageURL)) {
        res.status(404).json({ message: "One or more fields are not filled" })
        return
    }


    const newMovie = {
        name: movieName,
        descritpion: description,
        date: movieDate,
        image: imageURL
    }

    const sql = await client.query({
        text: 'INSERT INTO "Movies" (name, description, date, image) values($1, $2, $3,$4) ',
        values: [movieName, description, movieDate, imageURL]
    })

    res.send(sql)
})

/*
Ces routes permettent d'aller chercher dans la base de données :
-une liste de tous les films de la table "Movies" ainsi qu'une plus spécifique par id
-une liste de tous les films de la table "Reservations" ainsi qu'une plus spécifique par id
-une liste de certains users afin de les promouvoir admin
*/
router.get('/movies', async(req, res) => {
    const sql = await client.query({
        text: 'SELECT * FROM "Movies"'
    })
    res.status(200).json(sql.rows)
})

router.get('/movies/:id', async(req, res) => {
    const id = req.params.id
    const sql = await client.query({
        text: 'SELECT * FROM "Movies" WHERE id=$1',
        values: [id]
    })
    res.status(200).json(sql.rows)
})

router.get('/myreservations', async(req, res) => {
    const sql = await client.query({
        text: 'SELECT * FROM reservation'
    })
    res.status(200).json(sql.rows)
})

router.get('/reservations/:id', async(req, res) => {
    const id = req.params.id
    const sql = await client.query({
        text: 'SELECT * FROM "Reservations" WHERE id=$1',
        values: [id]
    })
    res.status(200).json(sql.rows)
})

//Cancel a reservation
router.delete('/cancelMyReservation', async(req, res) => {
    const id = req.params.id
    const sql = await client.query({
        text: 'DELETE FROM reservation WHERE name=$1',
        values: [id]
    })
})


module.exports = router