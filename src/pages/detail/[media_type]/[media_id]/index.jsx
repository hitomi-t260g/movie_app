import AppLayout from '@/components/Layouts/AppLayout'
import { Box, Container, Grid, Typography } from '@mui/material'
import axios from '@/lib/laravelAxios'
import Head from 'next/head'
import React, { StrictMode } from 'react'

const Detail = props => {
    const { detail, media_type } = props

    return (
        <StrictMode>
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detail
                    </h2>
                }>
                <Head>
                    <title>Laravel - Detail</title>
                </Head>
                <Box
                    sx={{
                        height: { sx: 'auto', md: '70vh' },
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    <Box
                        sx={{
                            backgroundImage: `url(https:image.tmdb.org/t/p/original${detail.backdrop_path})`,
                            position: 'absolute',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,

                            '&:before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: `rgba(0,0,0,0.5)`,
                                backdropFilter: 'blur(10px)',
                            },
                        }}
                    />
                    <Container sx={{ zIndex: 1 }}>
                        <Grid
                            container
                            alignItems={'center'}
                            sx={{ color: 'white' }}>
                            <Grid
                                item
                                md={4}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                <img
                                    width={'70%ß'}
                                    alt={detail.title}
                                    src={`https:image.tmdb.org/t/p/original${detail.backdrop_path}`}
                                />
                            </Grid>
                            <Grid item md={8}>
                                <Typography variant="h4" paragraph>
                                    {detail.title || detail.name}
                                </Typography>
                                <Typography paragraph>
                                    {detail.overview}
                                </Typography>
                                <Typography valiant="h6">
                                    {media_type === 'movie'
                                        ? `公開日：${detail.release_date}`
                                        : `初回放送日：${detail.first_air_date}`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </AppLayout>
        </StrictMode>
    )
}

// SSR処理を外側に書く
export async function getServerSideProps(context) {
    const { media_type, media_id } = context.params
    // サーバーサイドなので、process.envから読み込んでもブラウザ側へ表示されることがない。このことを意識して利用する

    try {
        const JpResponse = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )
        let combinedData = { ...JpResponse.data }
        if (!JpResponse.data.overview) {
            const EnResponse = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-EN`,
            )
            combinedData.overview = EnResponse.data.overview
        }
        return {
            props: {
                detail: combinedData,
                media_type,
                media_id,
            },
        }
    } catch (error) {
        // not found pageの表示
        return { notFound: true, revalidate: 60 }
    }
}

export default Detail