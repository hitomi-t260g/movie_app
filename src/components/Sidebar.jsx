import { List, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Sidebar = props => {
    const { setCategory } = props
    const categories = [
        {
            id: 1,
            name: '全て',
            category: 'all',
        },
        {
            id: 2,
            name: '映画',
            category: 'movie',
        },
        {
            id: 3,
            name: 'テレビ',
            category: 'tv',
        },
    ]

    return (
        <>
            <Typography variant="h6" gutterBottom>
                絞り込み
            </Typography>

            <List component={'nav'}>
                {categories.map(category => (
                    <ListItemButton
                        key={category.id}
                        onClick={() => setCategory(category.category)}>
                        <ListItemText primary={category.name} />
                    </ListItemButton>
                ))}
            </List>
        </>
    )
}

export default Sidebar
