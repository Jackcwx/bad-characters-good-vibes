import * as Path from 'node:path'
import express from 'express'

import characterRoutes from './routes/characterRoutes'
import managerRoutes from './routes/managerRoutes'

const server = express()
server.use(express.json())

server.use('/api/v1/characters', characterRoutes)
// server.use('/api/v1/characters/:id', characterRoutes)
server.use('/api/v1/managers', managerRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
