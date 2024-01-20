import { Box, TextField } from '@mui/material'
import React from 'react'
import Button from './Button'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = () => {
    return (
        <Box
            component={'form'}
            sx={{
                width: '80%',
                margin: '3% auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
            }}>
            <TextField
                fullWidth
                variant="filled"
                placeholder="検索する"
                sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            />
            <Button type="submit">
                <SearchIcon />
            </Button>
        </Box>
    )
}

export default SearchBar
