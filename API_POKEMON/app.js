const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);
async function connectDB() {
    try {
        await mongoClient.connect();
        const pokemonDatabase = mongoClient.db("pokemon");
        const pokemonCollection = pokemonDatabase.collection("pokemon");
        // const pokemonItem = await pokemonCollection.findOne();
        // ! Cursor super chiant
        // const pokemonCursor = await pokemonCollection.find();
        // console.log(pokemonCursor);
        // for await (pokemon of pokemonCursor) {
        //     console.log(pokemon);
        // }
        // * Projection
        const options = {
            projection: {
                name: 1,
                type1: 1
            }
        }
        // * Selection
        const selection = {
            type1: "normal"
        };
        // ! On crée un tableau
        const pokemonArray = await pokemonCollection.find(selection, options).toArray();
        // console.log(pokemonArray[4]);
        for (let i = 0; i < pokemonArray.length; i++) {
            console.log(pokemonArray[i].name);
        }
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await mongoClient.close();
    }
}
connectDB(); 