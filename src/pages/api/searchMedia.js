import axios from '@/lib/laravelAxios'

export default async (req, res) => {
    const { searchQuery } = req.query
    console.log(searchQuery)
    if (!searchQuery) {
        return res.status(400).json({ message: '検索文字がありません' })
    }

    try {
        // homeでエンコードしているはずが、uriから取得する際にデコードされxmlエラーがおきるため再度エンコードする
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/multi?api_key=${
                process.env.TMDB_API_KEY
            }&query=${encodeURIComponent(searchQuery)}&language=ja-JP`,
        )
        return res.status(200).json(response.data)
    } catch (err) {
        console.log('エラー内容は...', err)
        return res
            .status(500)
            .json({ message: 'サーバー側でエラーが発生しました' }) //500エラーはサーバー側の機密情報が入っている可能性があるため、errなどで詳細なエラーをフロントに返すことはしない
    }
}
