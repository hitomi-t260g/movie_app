import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const search = () => {
    const router = useRouter()
    // router.query.xxx にてurlの?xxx=yyy のyyyの値を取り出す
    // const query = router.query.query
    // さらに分割代入で、書き直す
    const { query: searchQuery } = router.query

    // 検索結果が変わる度に呼び出されてほしいため、useEffectを使う
    useEffect(() => {
        const fetchMedia = async () => {
            try {
                // APIを呼び出す際、env内容がブラウザに表示されることをさけるため、サーバー側のapiを非同期で呼び出す
                const response = await axios.get(
                    `api/searchMedia?${searchQuery}`,
                )
            } catch (error) {
                console.log(error)
            }
        }
        fetchMedia()
    }, [searchQuery])

    return <div />
}

export default search
