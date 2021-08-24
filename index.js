require('dotenv').config()

const server = require('./api/server')
const db = require('./api/data/db-config')
const port = process.env.PORT || 3000

async function start() {
  await db.migrate.rollback()
  await db.migrate.latest()

  server.listen(port, () => {
    console.log('listening on ' + port)
  })
}

start().then(()=>{
  console.log('started');
});







