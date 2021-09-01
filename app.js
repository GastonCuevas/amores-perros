var express = require('express');
var app = express();

const pug = require('pug');

app.use(express.static(__dirname + "/public"));

var perros_array = [
    { raza: "Caniche", texto: "Perro de compañia", imagen: "caniche.jpg"},
    { raza: "Doberman", texto: "Perro de defensa", imagen: "doberman.jpg"},
    { raza: "Labrador", texto: "Perro de entramiento", imagen: "labrador.jpg"}
]

app.get("/", (req, res) => {
    // res.send("index.html");
    res.render("index.pug", {
        titulo: "Perros del mundo",
        texto: "Selecciona un perro",
        imagen: "img1.jpg",
        perros: perros_array
    });
});

app.get("/perro/:raza", (req, res) => {
    var datosPerro = perros_array.filter((perro)=>{
        if(req.params.raza == perro.raza){
            return perro;
        }
    })[0];
    res.render("perro.pug", {
        raza: req.params.raza,
        data: datosPerro
    });
});

app.use((req, res) => {
    res.status(400);
    let error = req.originalUrl;
    res.render("404.pug", {texto: error});
});

app.listen(3000, () => {
    console.log("Servidor en el puerto 3000");
});