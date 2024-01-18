import axios from 'axios'
import React from 'react'

const Detail = props => {
    const { detail } = props

    return (
        <>
            <h1>{detail.title}</h1>
            <div>Detail</div>
        </>
    )
}

// SSR処理を外側に書く
export async function getServerSideProps(context) {
    const { media_type, media_id } = context.params
    // サーバーサイドなので、process.envから読み込んでもブラウザ側へ表示されることがない。このことを意識して利用する

    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja_JP`,
        )
        const fetchData = response.data
        return {
            props: {
                detail: fetchData,
            },
        }
    } catch (error) {
        // not found pageの表示
        return { notFound: true, revalidate: 60 }
    }
}

export default Detail
