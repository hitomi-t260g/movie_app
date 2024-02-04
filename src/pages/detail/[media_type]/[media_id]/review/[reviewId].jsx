import CommentList from '@/components/CommentList'
import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import { Card, CardContent, Container, Rating, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ReviewDetail = () => {
    const [review, setReview] = useState(null)
    const [comments, setComments] = useState([])

    const router = useRouter()
    // reviewIdはファイル名と一致させること
    const { reviewId } = router.query

    // 特定のレビューのみフェッチする
    // レビューに対するコメントフェッチする
    useEffect(() => {
        if (!reviewId) {
            return
        }

        const fetchComments = async () => {
            try {
                const response = await laravelAxios.get(
                    `api/review/${reviewId}`,
                )
                // 直接response.dataを使わずに一度定数化する
                const fetchedComments = response.data
                setReview(fetchedComments)
                setComments(fetchedComments.comments)
            } catch (error) {
                console.error(error)
            }
        }
        // fetchReviewDetail()
        fetchComments()

        // reviewIdが変わるとfetchするようにする
    }, [reviewId])
    console.log(review)
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ReviewDetail
                </h2>
            }>
            <Head>
                <title>Laravel - ReviewDetail</title>
            </Head>

            <Container sx={{ py: 2 }}>
                {review ? (
                    <>
                        {/* レビュー内容 */}
                        <Card sx={{ minHeight: '200px' }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {review.user.name}
                                </Typography>

                                <Rating
                                    name="read-only"
                                    value={review.rating}
                                    readOnly
                                />

                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p">
                                    {review.content}
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* コメント */}
                        <CommentList comments={comments} />
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </Container>
        </AppLayout>
    )
}

export default ReviewDetail
