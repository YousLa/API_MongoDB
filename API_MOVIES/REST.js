let express = require('express');
const MongoClient = require('mongodb').MongoClient;

let app = express();
app.listen(8000);

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);

// * On crée une fonction asynchrone dans laquelle se trouve un try, catch et finally
async function connectDB() {
    try {
        // * On lui demande d'attendre que la connexion soit établit
        await mongoClient.connect();
        // * On lui indique à quelle base de données nous voulons accéder | Nom de la base de données
        const moviesDatabase = mongoClient.db("movies");
        // * On lui indique à quelle collection nous voulons accéder | Nom de la collection
        const imdbCollection = moviesDatabase.collection("imdb");
        // * Pour qu'il nous renvoie un seul Item de notre collection
        // const movieItem = await imdbCollection.findOne();
        // ! Cursor super chiant
        // const movieCursor = await imdbCollection.find();
        // console.log(movieCursor);
        // for await (movie of movieCursor) {
        //     console.log(movie);
        // }
        // * Projection
        const options = {
            projection: {
                Series_Title: 1,
                Released_Year: 1,
                _id: 0
            }
        }
        // * Selection
        const selection = {
            Released_Year: 1957
        };

        // ! On crée un tableau
        const moviesArray = await imdbCollection.find(selection, options).toArray();
        // console.log(moviesArray[4]);
        for (let i = 0; i < moviesArray.length; i++) {
            console.log(moviesArray[i].Series_Title);
        }
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await mongoClient.close();
    }
}

app.get('/movies',
    function (request, response) {
        connectDB();
        response.setHeader('Content-Type', 'application/json');
        response.send(moviesArray);
    }
);

app.get('/movies/:id',
    function (request, response) {
        connectDB();
        response.setHeader('Content-Type', 'application/json');
        response.send(request.params.id);
    }
);