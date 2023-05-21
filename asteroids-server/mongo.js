const mongoose = require('mongoose')

const { Schema, model } = mongoose

const password = 'pw_asteroids'
const connectionString = `mongodb+srv://u_asteroids:${password}@asteroids00.5t6bxjc.mongodb.net/`
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('mongo database connected')
  })
  .catch((err) => {
    console.log('error connecting to mongo: ' + err)
  })

const asteroidsFavoriteSchema = new Schema({
  value: {
    type: String,
    required: true
  }
})

const AsteroidsFavoriteModel = model(
  'AsteroidsFavorite',
  asteroidsFavoriteSchema
)

module.exports = { AsteroidsFavoriteModel }
