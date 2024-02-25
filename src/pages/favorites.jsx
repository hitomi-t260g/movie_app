import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import Head from 'next/head'
import React from 'react'
import useSWR from 'swr'

const favorites = () => {
    const fetcher = url => laravelAxios.get(url).then(res => res.data)
    // SWRを利用し、同一ユーザーで特定動作をしていなければキャッシュ内容を返す
    const { data: favoriteItems, error } = useSWR('api/favorites', fetcher)
    console.log(favoriteItems)
    if (error) {
        return <div>エラーが発生しました</div>
    }
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Favorites
                </h2>
            }>
            <Head>
                <title>Laravel - Favorites</title>
            </Head>
        </AppLayout>
    )
}

export default favorites
