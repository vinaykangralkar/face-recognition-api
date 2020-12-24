const Clarifai = require('clarifai');

const app = new Clarifai.App({
       apiKey: 'bd1b81550e2b4a54b7e8d2707e385e8d'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(error => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    
    db('users').where('id', '=', id).increment('entries', 1).returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(error => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}