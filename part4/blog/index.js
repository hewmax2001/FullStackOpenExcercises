const app = require('./app')
const config = require('./utils/config')
const log = require('./utils/logger')

app.listen(config.PORT, () => {
  log.info(`Server running on port ${config.PORT}`)
})