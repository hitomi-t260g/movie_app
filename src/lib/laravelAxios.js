import Axios from 'axios'

const laravelAxios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
})

export default laravelAxios
// laravelのAPIエンドポイントを呼び出す時の例
//laravelAxios自体にbaseURLが設定されているので、'https://localhost:8000/api/reviews'を指定している
// laravelAxios.get(`/api/reviews`)
// laravelAxios.post(`/api/reviews`)
