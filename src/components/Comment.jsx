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
    const { userName, content } = props

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
                    <ButtonGroup>
                        <Button>編集</Button>
                        <Button color="error">削除</Button>
                    </ButtonGroup>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Comment
