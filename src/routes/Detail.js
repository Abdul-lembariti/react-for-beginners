import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Details from './Details.module.css'
import styles from '../routes/Home.module.css'

function Detail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState(null)

  const getMovie = async () => {
    try {
      const response = await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      )
      const json = await response.json()

      if (json.status === 'ok') {
        const movieDetails = json.data.movie

        setMovie(movieDetails)
        setLoading(false)
      } else {
        console.error('Error fetching movie details:', json.status_message)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching movie details:', error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getMovie()
  }, [])

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading..</span>
        </div>
      ) : (
        <div key={movie.id} className={Details.main}>
          <div className={Details.container}>
            {' '}
            <img
              src={movie.large_cover_image}
              alt="movie"
              className={Details.img}
            />
          </div>
          <div className={Details.container}>
            <h1 className={Details.header}>{movie.title}</h1>
            <p>
              {movie.summary > 235
                ? `${movie.summary.slice(0, 235)}...`
                : movie.summary}
            </p>
            <p>Uploaded: {movie.date_uploaded}</p>
            <ul className={Details.list}>
              {movie.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Detail
