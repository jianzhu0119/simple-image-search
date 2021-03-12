const { Router } = require('express')
const giphy = require('./giphy')

const router = Router()

router.use('/giphy', giphy)

module.exports = router
