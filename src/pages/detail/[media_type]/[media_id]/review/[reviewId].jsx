import CommentForm from '@/components/CommentForm'
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
    const [commentContent, setCommentContent] = useState('')

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

    const handleCommentChange = e => {
        setCommentContent(e.target.value)
    }

    const handleCommentAdd = async e => {
        // onSubmit時に再レンダリングするのを防ぐ
        e.preventDefault()
        // スペースや空の場合はなにもしない trimで空文字を削除するのでスペース避けになる
        const trimmedCommentContent = commentContent.trim()

        if (!trimmedCommentContent) {
            return
        }

        // サーバー側に新しいコメントを送信する
        try {
            const response = await laravelAxios.post('/api/comments', {
                content: trimmedCommentContent,
                review_id: reviewId,
            })

            // クライアント側に新しいコメントを反映する
            // const newComment = {
            //     id: 5,
            //     content: 'サンプル投稿サンプルです',
            //     review_id: review.id,
            //     user: {
            //         id: 1,
            //         name: '山田花子',
            //     },
            // }
            const newComment = response.data
            setComments([...comments, newComment])
            setCommentContent('')
        } catch (error) {
            console.log(error)
        }
    }
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
                            {/* 返信用のフォーム */}
                            <CommentForm
                                handleCommentAdd={handleCommentAdd}
                                content={commentContent}
                                handleChange={handleCommentChange}
                            />
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
