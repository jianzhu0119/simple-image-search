import React, { useEffect, useState } from 'react'
import './app.css'
import request from './utils/request'
import { useDebounce } from 'use-debounce'

export default function App() {
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(0)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [query] = useDebounce(filter, 1000)

  useEffect(() => {
    setPage(0)
  }, [query])

  useEffect(() => {
    if (!query) {
      return
    }
    console.log('fetching', query, page)

    const params = {
      q: query,
      limit: 5,
      offset: page,
    }

    setLoading(true)
    request
      .get('/api/v1/giphy', { params })
      .then(response => {
        setData(response.data.data.data)
      })
      .catch(e => {
        setError(e.message)
      })
      .finally(() => setLoading(false))
  }, [page, query])

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <button onClick={() => setPage(Math.max(0, page - 1))}>Prev</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      <div>
        {data?.map(item => (
          <div key={item.id}>
            <img
              className="giphy-image"
              src={item.images.fixed_width.url}
              alt={item.title}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
