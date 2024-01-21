import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import Button from './Button'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const router = useRouter()

    const handleChange = event => {
        setQuery(event.target.value)
    }
    const searchQuery = event => {
        event.preventDefault()

        // スペースや空の場合はなにもしない trimで空文字を削除するのでスペース避けになる
        if (!query.trim()) {
            return
        }
        // Tips: encodeURIComponentを用いることで、queryをただの文字列として入力する
        router.push(`search?query=${encodeURIComponent(query)}`)
    }
    return (
        <Box
            component={'form'}
            onSubmit={searchQuery}
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
                onChange={handleChange}
            />
            <Button type="submit">
                <SearchIcon />
            </Button>
        </Box>
    )
}

export default SearchBar
