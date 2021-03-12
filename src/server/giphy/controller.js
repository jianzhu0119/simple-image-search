const axios = require('axios')
const mockData = require('./mock-data')

const getGiphy = () => async (req, res) => {
  const { q, limit, offset } = req.query
  // console.log('fetching giphy', q, limit, offset)

  const params = {
    api_key: process.env.GIPHY_ACCESS_KEY,
    q,
    limit,
    offset: offset * limit,
  }
  try {
    const result = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params,
    })
    res.json({ success: true, data: result.data })
    // res.json({ success: true, data: mockData })
  } catch (err) {
    console.log(err)
    return res.json({ success: false })
  }
}

module.exports = {
  getGiphy,
}
