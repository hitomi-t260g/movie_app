import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material'
import React from 'react'

const Comment = props => {
    const { userName, content, id, handleDelete } = props

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {userName}
                </Typography>

                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gutterBottom
                    paragraph>
                    {content}
                </Typography>

                <Grid container justifyContent="flex-end">
                    <ButtonGroup sx={{ gap: 1 }}>
                        <Button
                            //  muiの何かがうまくいかず、marginをつけると右側の線が消えてしまうため直接指定する
                            style={{
                                borderRight:
                                    '1px solid rgba(25, 118, 210, 0.5)',
                                borderRadius: '4px',
                            }}>
                            編集
                        </Button>
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
