import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React from 'react'

const ReviewDetail = () => {
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
