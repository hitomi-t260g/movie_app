import { Grid } from '@mui/material'
import React, { useState } from 'react'
import Comment from './Comment'
import laravelAxios from '@/lib/laravelAxios'

const CommentList = props => {
    const { comments, setComments } = props
    // 編集用state
    const [commentEditMode, setCommentEditMode] = useState(null)
    const [editedComment, setEditedComment] = useState('')

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

    const handleEditComment = comment => {
        setCommentEditMode(comment.id)
        // 編集ボタン押下時のコメントを編集前にセーブするため、editedCommentに現在のコメントをセットする
        setEditedComment(comment.content)
    }

    const handleConfirmEditComment = async commentId => {
        setCommentEditMode(null)
        try {
            // サーバー側のコメントを編集する
            const response = await laravelAxios.put(
                `api/comment/${commentId}`,
                {
                    content: editedComment,
                },
            )
            // クライアント側のコメントを更新する
            if (response.status === 200) {
                const updatedComments = comments.map(comment => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            content: editedComment,
                        }
                    }
                    return comment
                })
                setComments(updatedComments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Grid container spacing={3}>
            {comments.map(comment => (
                <Grid item xs={12} key={comment.id}>
                    <Comment
                        userName={comment.user.name}
                        content={comment.content}
                        id={comment.id}
                        handleDelete={handleDeleteComment}
                        handleEdit={() => handleEditComment(comment)}
                        handleConfirmEdit={() =>
                            handleConfirmEditComment(comment.id)
                        }
                        editMode={commentEditMode}
                        editedComment={editedComment}
                        setEditedComment={setEditedComment}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default CommentList
