const express = require('express');

const cors = require('cors');

const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(cors());

app.use(express.json());

const friends = [
    {
        id: uuid(),
        name: 'Laura',
        nivel: "5"
    }
]

function logInfo (request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel);
}

function validateId (request, response, next) {
    const { id } = request.params;

    if( !isUuid(id) ){
        
        return response.status(400).json({ error: "Is not a validate id" })
    } else {
        next();
    }
}

app.use(logInfo);

app.use('/friends/:id', validateId);

app.get('/friends', (request, response) => {
    const { nivel } = request.query;
   
    const results = nivel
        ? friends.filter(friend => friend.nivel == nivel)
        : friends;

    return response.json(results);
});

app.post('/friends', (request, response) => {
    const { name, nivel } = request.body;

    const friend = {
        id: uuid(),
        name,
        nivel
    }

    friends.push(friend);

    return response.json(friend);
});

app.put('/friends/:id', (request, response) => {
    const { id } = request.params;
    const { name, nivel } = request.body;

    const friendIndex = friends.findIndex(friend => friend.id == id);

    if( friendIndex < 0 ) {
        return response.status(400).json( { error: "Not found Id"} )
    } else {

        const friend = {
            id: id,
            name,
            nivel
        }

        friends[friendIndex] = friend;

        return response.json(friend);
    }
});

app.delete('/friends/:id', (request, response) => {
    const { id } = request.params;

    const friendIndex = friends.findIndex(friend => friend.id == id);

    if( friendIndex < 0 ) {
        return response.status(400).json( { error: "Not found Id"} )
    } else {
        friends.splice(friendIndex, 1);

        return response.status(204).json()
    }
});



app.listen('3333', () => {
    console.log('server test online!!');
})