const express = require('express');
const app = express();
const port = 3000;

// In-memory storage for actors and movies
let actors = [];
let movies = [];


app.use(express.json());

// Helper function to check if date is in the future
const isFutureDate = (date) => new Date(date) <= new Date();

// Create a new actor
app.post('/actors', (req, res) => {
    const { firstName, lastName, dateOfBirth } = req.body;

    if (!firstName || !lastName || !dateOfBirth) {
        return res.status(400).json({ message: 'Fields are required: firstName, lastName, and dateOfBirth.' });
    }

    if (isFutureDate(dateOfBirth)) {
        return res.status(400).json({ message: 'Date of birth cannot be in the future.' });
    }

    const actor = {
        id: actors.length + 1,
        firstName,
        lastName,
        dateOfBirth
    };

    actors.push(actor);
    res.status(201).json(actor);
});

// Get all actors
app.get('/actors', (req, res) => {
    res.json(actors);
});

// Get actor by ID
app.get('/actors/:id', (req, res) => {
    const actor = actors.find(a => a.id === parseInt(req.params.id));

    if (!actor) {
        return res.status(404).json({ message: 'Actor not found.' });
    }

    res.json(actor);
});

// Update an Actor
app.put('/actors/:id', (req, res) => {
    const actor = actors.find(a => a.id === parseInt(req.params.id));

    if (!actor) {
        return res.status(404).json({ message: 'Actor not found.' });
    }

    const { firstName, lastName, dateOfBirth } = req.body;

    if (actor) {
        actor.firstName = firstName || actor.firstName;
        actor.lastName = lastName || actor.lastName;
        actor.dateOfBirth = dateOfBirth || actor.dateOfBirth;
    }

    res.json(actor);
});

// Delete an Actor
app.delete('/actors/:id', (req, res) => {
    const actorIndex = actors.findIndex(a => a.id === parseInt(req.params.id));

    if (actorIndex === -1) {
        return res.status(404).json({ message: 'Actor not found.' });
    } else {
        actors.splice(actorIndex, 1);
        res.status(204).json({ message: 'Actor deleted' });
    }
});

// Create a new movie with an associated actor
app.post('/movies', (req, res) => {
    const { title, creationDate, actorId } = req.body;

    if (!title || !creationDate || !actorId) {
        return res.status(400).json({ message: 'Title, creationDate, and actorId are required.' });
    }

    const actor = actors.find(a => a.id === actorId);

    if (!actor) {
        return res.status(404).json({ message: 'Actor not found.' });
    }

    const movie = {
        id: movies.length + 1,
        title,
        creationDate,
        actorId,     // Associate movie with actor by actorId
    };

    movies.push(movie);
    res.status(201).json(movie);
});

// Get all movies
app.get('/movies', (req, res) => {
    const moviesWithActors = movies.map(movie => {
        const actor = actors.find(a => a.id === movie.actorId);
        return { ...movie, actor };
    });
    res.json(moviesWithActors);
});

// Get movie by ID
app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));

    if (!movie) {
        return res.status(404).json({ message: 'Movie not found.' });
    }

    const actor = actors.find(a => a.id === movie.actorId);
    res.json({ ...movie, actor });
});

// Update a Movie
app.put('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));

    if (!movie) {
        return res.status(404).json({ message: 'Movie not found.' });
    }

    const { title, creationDate, actorId } = req.body;

    if (movie) {
        movie.title = title || movie.title;
        movie.creationDate = creationDate || movie.creationDate;
        movie.actor = actorId || movie.actor;
    }


    res.json(movie);
});

// Delete a Movie
app.delete('/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found.' });
    } else {
        movies.splice(movieIndex, 1);
        res.status(204).json({ message: 'Movie deleted' });
    }

});

// Start the server
app.listen(port, () => {
    console.log(`Movie and Actor API running on port ${port}`);
});
