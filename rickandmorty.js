const request = require('request'); //Inkludera request, npm install request --save
request.get('https://rickandmortyapi.com/api/character/?name=rick', (e, a) => {
    if(!e) {
        data = JSON.parse(a.body); //Gör om till json
        ricks = data.results; //Använd resultatet
        ricks.forEach((r) => { //Loopa igenom alla resultat
            console.log(r.image);
        });
    }
});