import { List, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Sidebar = () => {
    const categories = [
        {
            id: 1,
            name: '全て',
        },
        {
            id: 2,
            name: '映画',
        },
        {
            id: 3,
            name: 'テレビ',
        },
    ]
    return (
        <>
            <Typography variant="h6" gutterBottom>
                カテゴリ
            </Typography>

            <List component={'nav'}>
                {categories.map(category => (
                    <ListItemButton key={category.id}>
                        <ListItemText primary={category.name} />
                    </ListItemButton>
                ))}
            </List>
        </>
    )
}

export default Sidebar
