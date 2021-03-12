const { Router } = require('express')
const { getGiphy } = require('./controller')

const router = Router()

router.get('/', getGiphy())

module.exports = router
