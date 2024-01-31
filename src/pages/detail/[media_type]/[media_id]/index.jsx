import AppLayout from '@/components/Layouts/AppLayout'
import {
    Box,
    Button,
    ButtonGroup,
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
import StarIcon from '@mui/icons-material/Star'

const Detail = props => {
    const { detail, media_type, media_id } = props
    const [open, setOpen] = useState(false)
    const [rate, setRate] = useState(0)
    const [comment, setComment] = useState('')
    const [reviews, setReviews] = useState([])
    const [averageRating, setAverageRating] = useState(0)

    // commentはスペースも考慮しtrimするのを忘れないように
    const isDisabled = !rate || !comment.trim()

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await laravelAxios.get(
                    `api/reviews/${media_type}/${media_id}`,
                )
                // 直接response.dataを使わずに一度定数化する
                const fetchedReviews = response.data
                setReviews(fetchedReviews)
                updateAverageRating(fetchedReviews)
            } catch (error) {
                console.log(error)
            }
        }

        fetchReviews()

        // urlが変わるとfetchするようにする
    }, [media_type, media_id])

    const handleReviewAdd = async () => {
        setOpen(false)
        try {
            // サーバー側に新しいレビューを送信する
            const response = await laravelAxios.post(`api/reviews`, {
                content: comment,
                rating: rate,
                media_type: media_type,
                media_id: media_id,
            })
            // クライアント側に新しいレビューを反映する
            const newReview = response.data
            setReviews([...reviews, newReview])
            setComment('')
            setRate(0)

            const updatedReviews = [...reviews, newReview]
            updateAverageRating(updatedReviews)
        } catch (error) {
            console.log(error)
        }
    }

    const updateAverageRating = updatedReviews => {
        if (updatedReviews.length > 0) {
            // レビューの星の数の合計値を計算する
            const totalRating = updatedReviews.reduce(
                (acc, review) => acc + review.rating,
                0,
            )

            // レビューの平均値を計算する
            // toFixedにより、小数点第一位まで四捨五入した値となり、文字列に変換される
            const averageRating = (totalRating / updatedReviews.length).toFixed(
                1,
            )

            // レビューの平均値を更新する
            setAverageRating(averageRating)
        }
    }

    const handleDeleteReview = async id => {
        try {
            // サーバー側のレビューを削除する
            const response = await laravelAxios.delete(`api/reviews/${id}`)
            // クライアント側のレビューを削除する
            if (response.status === 200) {
                const updatedReviews = reviews.filter(
                    review => review.id !== id,
                )
                setReviews(updatedReviews)
                updateAverageRating(updatedReviews)
            }
        } catch (error) {
            console.log(error)
        }

        // レビューを削除したことをユーザーに知らせる
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
                                <Box
                                    gap={2}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}>
                                    <Rating
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={
                                            <StarIcon
                                                style={{ color: 'lightgray' }}
                                            />
                                        }
                                        // 小数点をもつnumber型に変換すること
                                        value={parseFloat(averageRating)}
                                    />
                                    <Typography
                                        sx={{
                                            ml: 1,
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                        }}>
                                        {averageRating}
                                    </Typography>
                                </Box>
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
                                                <Grid
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'flex-end',
                                                    }}>
                                                    <ButtonGroup>
                                                        <Button>編集</Button>
                                                        <Button
                                                            color="error"
                                                            onClick={() =>
                                                                handleDeleteReview(
                                                                    review.id,
                                                                )
                                                            }>
                                                            削除
                                                        </Button>
                                                    </ButtonGroup>
                                                </Grid>
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
                            color="primary"
                            disabled={isDisabled}
                            onClick={handleReviewAdd}
                            style={{ border: 'solid 1px lightBlue' }}>
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
