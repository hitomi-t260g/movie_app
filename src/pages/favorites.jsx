import AppLayout from '@/components/Layouts/AppLayout'
import MediaCard from '@/components/MediaCard'
import laravelAxios from '@/lib/laravelAxios'
import { Container, Grid, Typography } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import useSWR from 'swr'

const favorites = () => {
    const fetcher = url => laravelAxios.get(url).then(res => res.data)
    // SWRを利用し、同一ユーザーで特定動作をしていなければキャッシュ内容を返す
    const { data: favoriteItems, error } = useSWR('api/favorites', fetcher)

    // loadingは初期表示時にしか値が変わらずbooleanで表現できるので、state管理ではなくただの変数とする
    const loading = !error & !favoriteItems
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
            {/* お気に入り一覧表示 */}
            {loading ? (
                <Grid item textAlign="center" xs={12}>
                    <Typography>Loading...</Typography>
                </Grid>
            ) : favoriteItems.length > 0 ? (
                <Container>
                    <Grid container spacing={3} py={3}>
                        {
                            // favoriteItemsがundefinedの場合は無視するよう、?オプショナルをつけることもあるが、普通はloading管理をするため不要
                            favoriteItems.map(item => {
                                return (
                                    <MediaCard
                                        media={item}
                                        key={item.id}
                                        isContent={false}
                                    />
                                )
                            })
                        }
                    </Grid>
                </Container>
            ) : (
                <Grid item textAlign="center" xs={12}>
                    <Typography>お気に入りが見つかりませんでした</Typography>
                </Grid>
            )}
        </AppLayout>
    )
}

export default favorites
