const express = require('express')
const http = require('http')
const cors = require('cors')
const { AsteroidsFavoriteModel } = require('./mongo')

const app = express()
app.use(cors())

app.get('/favorites', async (request, response) => {
  try {
    const result = await AsteroidsFavoriteModel.find({})
    const favorites = result.map((asteroid) => asteroid.value)
    response.json(favorites)
  } catch (err) {
    console.log('Error fetching favorites:', err)
    response.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/favorites/:id', async (request, response) => {
  const value = request.params.id
  try {
    const result = await AsteroidsFavoriteModel.find({})
    const found = result.some((asteroid) => asteroid.value === value)

    if (!found) {
      const asteroidFavorite = new AsteroidsFavoriteModel({ value })
      const newFavorite = await asteroidFavorite.save()
      console.log('asteroidFavorite saved!')
      console.log(newFavorite)

      result.push(newFavorite)
      const favorites = result.map((asteroid) => asteroid.value)
      response.json(favorites)
    } else {
      response.status(400).json({ error: 'Asteroid already favorited' })
    }
  } catch (err) {
    console.log('Error saving asteroidFavorite:', err)
    response.status(500).json({ error: 'Internal Server Error' })
  }
})

app.delete('/favorites/:id', async (request, response) => {
  const value = request.params.id
  try {
    const result = await AsteroidsFavoriteModel.findOneAndDelete({ value })
    console.log('asteroidFavorite deleted!')
    console.log(result)

    const favoritesResult = await AsteroidsFavoriteModel.find({})
    const favorites = favoritesResult.map((asteroid) => asteroid.value)
    response.json(favorites)
  } catch (err) {
    console.log('Error deleting asteroidFavorite:', err)
    response.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/asteroids-api/:type/:id?', (request, response) => {
  const { type, id } = request.params
  const querystring = new URLSearchParams({
    ...request.query
  }).toString()

  const options = {
    hostname: 'api.nasa.gov',
    port: 80,
    path: `/neo/rest/v1/${type + (id ? `/${id}` : '')}?${querystring}`,
    method: request.method
  }

  console.log({ options })

  response.setHeader('Access-Control-Allow-Origin', '*')

  const proxy = http.request(options, (res) => {
    res.on('data', (chunk) => {
      response.write(chunk)
    })

    res.on('end', () => {
      response.end()
    })

    response.writeHead(res.statusCode, res.headers)
  })

  request.on('data', (chunk) => {
    proxy.write(chunk)
  })

  request.on('end', () => {
    proxy.end()
  })

  proxy.on('error', (err) => {
    console.log('Error:', err)
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
