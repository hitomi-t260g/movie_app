import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React from 'react'

const favorites = () => {
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
