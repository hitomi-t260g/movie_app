import { Grid } from '@mui/material'
import React from 'react'
import Comment from './Comment'
import laravelAxios from '@/lib/laravelAxios'

const CommentList = props => {
    const { comments, setComments } = props

    const handleDeleteComment = async commentId => {
        if (window.confirm('コメントを削除してもよろしいですか？')) {
            try {
                // サーバー側のコメントを削除する
                const response = await laravelAxios.delete(
                    `api/comment/${commentId}`,
                )
                // クライアント側のコメントを削除する
                if (response.status === 200) {
                    const updatedComments = comments.filter(
                        comment => comment.id !== commentId,
                    )

                    setComments(updatedComments)
                    // コメントを削除したことをユーザーに知らせる
                    window.alert('コメントを削除しました')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
            {comments.map(comment => (
                <Grid item xs={12} key={comment.id} sx={{ mt: 2 }}>
                    <Comment
                        userName={comment.user.name}
                        content={comment.content}
                        handleDelete={handleDeleteComment}
                        id={comment.id}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default CommentList
