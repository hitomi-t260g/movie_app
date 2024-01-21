import AppLayout from '@/components/Layouts/AppLayout'
import Layout from '@/components/Layouts/Layout'
import MediaCard from '@/components/MediaCard'
import Sidebar from '@/components/Sidebar'
import { Grid } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const search = () => {
    const [category, setCategory] = useState('all')
    const [results, setResults] = useState([])
    const router = useRouter()
    // router.query.xxx にてurlの?xxx=yyy のyyyの値を取り出す
    // const query = router.query.query
    // さらに分割代入で、書き直す
    const { query: searchQuery } = router.query

    // 検索結果が変わる度に呼び出されてほしいため、useEffectを使う
    useEffect(() => {
        // 初回ローディング時にはsearchQueryがundefinedなので、undefined時にはfetchしないようにする
        if (!searchQuery) {
            return
        }
        const fetchMedia = async () => {
            try {
                // APIを呼び出す際、env内容がブラウザに表示されることをさけるため、サーバー側のapiを非同期で呼び出す
                const response = await axios.get(
                    `api/searchMedia?searchQuery=${searchQuery}`,
                )
                const searchResults = response.data.results
                const validResults = searchResults.filter(
                    item =>
                        item.media_type === 'movie' || item.media_type === 'tv',
                )
                setResults(validResults)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMedia()
    }, [searchQuery])

    // 取得した20件の中から絞り込み結果を行う
    const filteredResults = results.filter(result => {
        if (category === 'all') {
            return results
        }
        return result.media_type === category
    })
    console.log(filteredResults)

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Search
                </h2>
            }>
            <Head>
                <title>Laravel - Search</title>
            </Head>
            <Layout sidebar={<Sidebar setCategory={setCategory} />}>
                <Grid container spacing={3}>
                    <MediaCard />
                </Grid>
            </Layout>
        </AppLayout>
    )
}

export default search
