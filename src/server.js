const express = require('express')
const nunjucks = require('nunjucks')

const db = require('./database/db')

const server = express()

// NUNJUCKS
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// SERVER
server.use(express.static("public"))

server.use(express.urlencoded({extended: true}))

server.get('/', (req, res) => {
    res.render("index.html")
})

server.get('/create-point/', (req, res) => {
    res.render("create-point.html")
})

server.get('/search/', (req, res) => {

    const search = req.query.search

    if(search == "") {
        res.render("search-results.html", {total: 0}) 
    }
    else {
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%';`, (err, rows) => {
            if(err) {
                return console.log(err)
            }
            else {
                const total = rows.length
                res.render("search-results.html", {places: rows, total})  
            }
        })
    }
})

server.post("/save-point/", (req, res) => {
    const query = `INSERT INTO places (name, image, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`
    const place = req.body

    console.log(place.city)

    const values = [
        place.name,
        place.image,
        place.address,
        place.address2,
        place.state,
        place.city,
        place.items
    ]

    db.run(query, values, (err) => {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        else {
            console.log("Cadastrado com sucesso!")
            console.log(this)

            return res.render("create-point.html", {saved: true})
        }
    })
})

server.listen(3000)