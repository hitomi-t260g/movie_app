import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Grid,
    TextareaAutosize,
    Typography,
} from '@mui/material'
import React from 'react'

const Comment = props => {
    const {
        userName,
        content,
        id,
        editMode,
        editedComment,
        handleDelete,
        handleEdit,
        handleConfirmEdit,
        setEditedComment,
    } = props

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {userName}
                </Typography>
                {editMode === id ? (
                    // 編集時のコメント表示
                    <TextareaAutosize
                        value={editedComment}
                        minRows={3}
                        style={{
                            width: '100%',
                        }}
                        onChange={e => setEditedComment(e.target.value)}
                    />
                ) : (
                    //通常時のコメント表示
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        gutterBottom
                        paragraph>
                        {content}
                    </Typography>
                )}

                <Grid container justifyContent="flex-end">
                    <ButtonGroup sx={{ gap: 1 }}>
                        {editMode === id ? (
                            // 編集時のボタン表示
                            <Button
                                //  muiの何かがうまくいかず、marginをつけると右側の線が消えてしまうため直接指定する
                                style={{
                                    borderRight:
                                        '1px solid rgba(25, 118, 210, 0.5)',
                                    borderRadius: '4px',
                                }}
                                onClick={handleConfirmEdit}>
                                編集完了
                            </Button>
                        ) : (
                            // 通常時のボタン表示
                            <Button
                                //  muiの何かがうまくいかず、marginをつけると右側の線が消えてしまうため直接指定する
                                style={{
                                    borderRight:
                                        '1px solid rgba(25, 118, 210, 0.5)',
                                    borderRadius: '4px',
                                }}
                                onClick={handleEdit}>
                                編集
                            </Button>
                        )}

                        <Button color="error" onClick={() => handleDelete(id)}>
                            削除
                        </Button>
                    </ButtonGroup>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Comment
