import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import { StrictMode, useEffect, useState } from 'react'

const Home = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await axios.get('api/getPopularMovies')
                setMovies(response.data.results)
                console.log('movies', movies)
            } catch (err) {
                console.log(err)
            }
        }
        fetchMovies()
    }, [])

    return (
        <StrictMode>
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Home
                    </h2>
                }>
                <Head>
                    <title>Laravel - Home</title>
                </Head>
                {movies.map(movie => (
                    <img
                        src={`https:image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt="sample"
                        key={movie.id}
                        height="100px"
                        width="100px"
                    />
                ))}
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                You're logged in!
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </StrictMode>
    )
}

export default Home
