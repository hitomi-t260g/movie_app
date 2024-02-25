import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material'
import Link from 'next/link'
import React from 'react'

const MediaCard = props => {
    const { media, isContent = true } = props
    const mediaPath = media.poster_path
        ? `https:image.tmdb.org/t/p/original${media.poster_path}`
        : '/media_poster_image/NO+IMAGE.png'
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardActionArea>
                    <Link href={`/detail/${media.media_type}/${media.id}`}>
                        <CardMedia
                            component={'img'}
                            sx={{ aspectRatio: '2/3' }}
                            image={mediaPath}
                        />
                        {isContent && (
                            <CardContent>
                                <Typography variant="h6" component="div" noWrap>
                                    {media.title || media.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary">
                                    公開日:
                                    {media.release_date || media.first_air_date}
                                </Typography>
                            </CardContent>
                        )}
                    </Link>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default MediaCard
