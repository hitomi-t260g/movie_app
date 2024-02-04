import { Grid } from '@mui/material'
import React from 'react'
import Comment from './Comment'

const CommentList = props => {
    const { comments } = props

    return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
            {comments.map(comment => (
                <Grid item xs={12} key={comment.id} sx={{ mt: 2 }}>
                    <Comment
                        userName={comment.user.name}
                        content={comment.content}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default CommentList
