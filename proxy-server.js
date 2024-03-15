import express from 'express'
import axios from 'axios'
const app = express()
const port = 3001 // Choose any available port

// Proxy endpoint to fetch and serve audio streams
app.get('/proxy', async (req, res) => {
  try {
    const { url } = req.query

    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' })
    }
    // Fetch the audio stream from the original HTTP URL
    const response = await axios.get(url, { responseType: 'stream' })
    // Pipe the audio stream to the response
    response.data.pipe(res)
  } catch (error) {
    console.error('Proxy Error:', error)
    res.status(500).json({ error: 'Proxy Error' })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`)
})
