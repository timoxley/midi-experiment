import CONFIG from '../config'
import server from './server'
const PORT = CONFIG('server.port')

process.nextTick(() => {
  server.listen(PORT, err => {
    if (err) throw err
    console.log('http://localhost:' + PORT)
  })
})
