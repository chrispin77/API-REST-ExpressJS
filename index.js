const express = require('express');
const DataStore = require('nedb');

const PORT = 3000;

//BDD qui sera un fichier 
const db = new DataStore({ filename: 'perso' });
//On charge la base de données au lancement du serveur
db.loadDatabase(); 

// ici on creer notre application express
const app = express(); 

// on dit a express d'analyser les requetes entrantes et de les placer dans le 'req.body' sous forme JSON
app.use(express.json()); 

//API CRUD

//LET START THE OPTION 'CREATE'

app.post('/api/perso', (req, res) => {
    console.log(req.body);
    db.insert(req.body);
    res.send(req.body);
})

// THE READ ALL DATA OPTION 
app.get('/api/perso', (req, res) => {
    db.find([{}], (error,doc) => {
        if(error){
            console.log(error);
        } else{
            res.send(doc);
        }
    })
})
// THE READ ONE DATA OPTION 
app.get('/api/perso/:id', (req, res) => {
    db.find({ _id: req.params.id }, (error,doc) => {
        if(error){
            console.log(error);
        } else{
            res.send(doc);
        }
    })
})

// THE UPDATE ONE DATA OPTION 
app.patch('/api/perso/:id', (req, res) => {
    delete req.body._id;
    db.update({ _id: req.params.id }, { ...req.body, _id: req.params.id}, (error,doc) => {
        if(error){
            console.log(error);
        } else{
            res.send(doc);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Le serveur Node tourne sur le port ${PORT}`)
})
