const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors());
app.use(express.json())

const games = [
    { id: 1, name: "Paladins, price: 0.00"},
    { id: 2, name: "Super Mario Bros. Wonder", price: 59.99},
    { id: 3, name: "Team Fortress 2", price: 0.00},
    { id: 4, name: "Kirby Avalance", price: 0.00},
    { id: 5, name: "Seiklus", price: 0.00},
]

app.get('/games', (req, res) =>
    {
        res.send(games)
    }
)

//otsib games järjendist ainult kasutaja poolt sisestatud
//idga objekti.
app.get('/games/:id', (req, res) => {
    if (typeof games[req.params.id -1]==='undefines') {
        return res.status(404).send(
            {error:'Game not foud. Possibly foud life?'})
    }
    //saadetakse taodeldava idga objekt tagasi
    res.send(games[req.params.id -1])
})
//sisestab uue mängu
app.post('/games', (req, res) => {
    //kontrollime parameetrite olemasolu
    if (!req.body.name || !req.body.price) {
        return res.status(400).send(
            {error: 'Missing name and/or price'})
    }
    //paname parameetrid uude objekti
    let newGame = {
        id: games.length+1,
        name : req.body.name,
        price: req.body.price,
    }
    //lisame objekti järjendisse
    games.push(newGame)
    //saadame kasutajale tagasi eduka teate
    res.
    status(201)
    .location('localhost:8080/games/'+(games.legth -1))
    .send(newGame)
})

//eemaldab mängu
app.delete('/games/:id', (req, res) =>{
    //kontrollitakse kas id on olemas
    if (typeof games[req.params.id -1]==='undefines') {
        return res.status(404).send(
            {error:'Game not found. Totally found life. GG'})
    }
    //eemaldame objeckti järjendist
    games.splice(req.params.id -1, 1)
    req.status(204).send(
        {error: 'No content, object deleted.'}
    )
} )

//api jookseb sellisel aadressil parameetriks on port
//millel kuulatakse sissetulevaid päringuid
app.listen(8080, () => {
    console.log(`Api jookseb aadressil: http://localhost:8080`)
})