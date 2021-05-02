const sqlite3 = require("sqlite3").verbose()

// Criar BANCO DE DADOS
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
/*db.serialize(() => {
    // Criar TABELA
    db.run(`
        CREATE TABLE IF NOT EXISTS places  (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    const query = `INSERT INTO places (name, image, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`
    const values = [
        "Pilhas",
        "https://images.unsplash.com/photo-1612965110642-d2ed35011901?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
        "R. Jeronimo Memoria",
        "105",
        "CE",
        "Guaraciaba do Norte",
        "1, 3"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        else {
            console.log("Cadastrado com sucesso!")
            console.log(this)
        }
    }

    //db.run(query, values, afterInsertData)

    db.all(`SELECT * FROM places;`, (err, rows) => {
        if(err) {
            return console.log(err)
        }
        else {
            console.log("Aqui estão seus registros.")
            console.log(rows)
        }
    })

    db.run(`DELETE FROM places WHERE id = ?;`, [1], (err) => {
        if(err) {
            return console.log(err)
        }
        else {
            console.log("Deletado com sucesso!")
        }
    })
})*/