import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ReviewDetail = () => {
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
                return fetchedComments
            } catch (error) {
                console.error(error)
            }
        }
        // fetchReviewDetail()
        fetchComments()

        // reviewIdが変わるとfetchするようにする
    }, [reviewId])

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
            <div>レビュー詳細ページです</div>
        </AppLayout>
    )
}

export default ReviewDetail
