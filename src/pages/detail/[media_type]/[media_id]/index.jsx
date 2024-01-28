import AppLayout from '@/components/Layouts/AppLayout'
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Fab,
    Grid,
    Modal,
    Rating,
    TextareaAutosize,
    Tooltip,
    Typography,
} from '@mui/material'
import laravelAxios from '@/lib/laravelAxios'
import Head from 'next/head'
import React, { StrictMode, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'

const Detail = props => {
    const { detail, media_type, media_id } = props
    const [open, setOpen] = useState(false)
    const [rate, setRate] = useState()
    const [comment, setComment] = useState('')

    const reviews = [
        {
            id: 1,
            content: '面白かった',
            rating: 5,
            user: {
                name: '山田花子',
            },
        },
        {
            id: 2,
            content:
                '泣きました。泣きました。泣きました。泣きました。泣きました。泣きました。泣きました。泣きました。泣きました。泣きました。泣きました。泣きました。泣きました。泣きました。',
            rating: 4,
            user: {
                name: '山田次郎',
            },
        },
        {
            id: 3,
            content: '面白くなかった',
            rating: 1,
            user: {
                name: '山田三郎',
            },
        },
    ]

    // commentはスペースも考慮しtrimするのを忘れないように
    const isDisabled = !rate || !comment.trim()

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await laravelAxios.get(
                    `api/reviews/${media_type}/${media_id}`,
                )
            } catch (error) {
                console.log(error)
            }
        }

        fetchReviews()

        // urlが変わるとfetchするようにする
    }, [media_type, media_id])

    const handleReviewAdd = async () => {
        try {
            const response = await laravelAxios.post(`api/reviews`, {
                content: comment,
                rating: rate,
                media_type: media_type,
                media_id: media_id,
            })
            setComment(response.data.comment)
            setRate(response.data.rating)
        } catch (error) {
            console.log(error)
        }
    }

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
                {/* 映画情報部分 */}
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
                {/* 映画情報はここまで */}

                {/* レビュー表示 */}
                <Container sx={{ py: 4 }}>
                    <Typography
                        component={'h1'}
                        variant="h4"
                        align="center"
                        gutterBottom>
                        レビュー一覧
                    </Typography>
                    {reviews.length > 0 ? (
                        <Grid container spacing={3}>
                            {reviews.map(review => {
                                return (
                                    <Grid item key={review.id} xs={12}>
                                        <Card>
                                            <CardContent>
                                                <Typography
                                                    component="div"
                                                    variant="h6"
                                                    gutterButtom>
                                                    {review.user.name}
                                                </Typography>
                                                <Rating
                                                    value={review.rating}
                                                    readOnly
                                                />
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    paragraph>
                                                    {review.content}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    ) : (
                        <Grid item textAlign="center" xs={12}>
                            <Typography>レビューはまだありません</Typography>
                        </Grid>
                    )}
                </Container>
                {/* レビュー表示はここまで */}

                {/* レビュー投稿投稿ボタン */}
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: '16px',
                        right: '16px',
                        zIndex: 5,
                    }}>
                    <Tooltip title="レビュー追加">
                        <Fab
                            style={{ background: '#1976d2', color: 'white' }}
                            sx={{ ':hover': { opacity: '0.8' } }}
                            onClick={() => setOpen(true)}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Box>
                {/* レビュー投稿ボタンはここまで */}

                {/* レビュー投稿用モーダルウィンドウ */}
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}>
                        <Typography variant="h6" component="h2">
                            レビューを書く
                        </Typography>
                        <Rating
                            required
                            onChange={(e, newValue) => setRate(newValue)}
                            value={rate}
                        />
                        <TextareaAutosize
                            required
                            minRows={5}
                            placeholder="レビュー内容"
                            style={{ width: '100%', marginTop: '10px' }}
                            onChange={e => setComment(e.target.value)}
                            value={comment}
                        />
                        <Button
                            valiant="outlined"
                            color="secondary"
                            disabled={isDisabled}
                            onClick={handleReviewAdd}>
                            送信
                        </Button>
                    </Box>
                </Modal>
                {/* レビュー投稿用モーダルウィンドウ はここまで*/}
            </AppLayout>
        </StrictMode>
    )
}

// SSR処理を外側に書く
export async function getServerSideProps(context) {
    const { media_type, media_id } = context.params
    // サーバーサイドなので、process.envから読み込んでもブラウザ側へ表示されることがない。このことを意識して利用する

    try {
        const JpResponse = await laravelAxios.get(
            `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )
        let combinedData = { ...JpResponse.data }
        if (!JpResponse.data.overview) {
            const EnResponse = await laravelAxios.get(
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
