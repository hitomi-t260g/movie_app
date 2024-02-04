import { Box, Button, TextField } from '@mui/material'
import React from 'react'

const CommentForm = props => {
    const { handleCommentAdd, content, handleChange } = props

    return (
        <Box
            component="form"
            onSubmit={e => handleCommentAdd(e)}
            noValidate
            autoComplete="off"
            p={2}
            sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'flex-start',
                bgcolor: 'background.paper',
            }}>
            <TextField
                inputProps={{ maxLength: 200 }}
                error={content.length > 200}
                helperText={content.length > 200 ? '200文字を超えています' : ''}
                fullWidth
                label="comment"
                variant="outlined"
                value={content}
                onChange={handleChange}
                sx={{ mr: 1, flexGrow: 1 }}
            />
            <Button
                variant="contained"
                type="submit"
                style={{
                    backgroundColor: '#1976d2',
                    color: '#fff',
                }}>
                送信
            </Button>
        </Box>
    )
}

export default CommentForm
