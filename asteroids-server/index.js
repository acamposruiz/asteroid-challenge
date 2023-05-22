const express = require('express')
const http = require('http')
const cors = require('cors')
const { AsteroidsFavoriteModel } = require('./mongo')

const app = express()
app.use(cors())

/**
 * REST API for Asteroids Favorite List
 */

app.get('/favorites', async (request, response) => {
  try {
    const result = await AsteroidsFavoriteModel.find({}) // getting all ids from the database
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
    const existingDoc = await AsteroidsFavoriteModel.findOne({ value })

    if (existingDoc) {
      return response.status(409).json({ error: 'The I already exist in the database.' })
    }

    const newFavorite = new AsteroidsFavoriteModel({ value })
    await newFavorite.save()

    return response.status(200).json({ message: 'ID added successfully.' })
  } catch (error) {
    console.error('Error when id added:', error)
    return response.status(500).json({ error: 'Internal Server Error.' })
  }
})

app.delete('/favorites/:id', async (request, response) => {
  const value = request.params.id

  try {
    const existingDoc = await AsteroidsFavoriteModel.findOne({ value })

    if (!existingDoc) {
      return response.status(404).json({ error: 'The ID does not exist in the database.' })
    }

    await AsteroidsFavoriteModel.deleteOne({ value })

    return response.status(200).json({ message: 'ID removed successfully.' })
  } catch (error) {
    console.error('Error removing the ID:', error)
    return response.status(500).json({ error: 'Internal Server Error.' })
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
