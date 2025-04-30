import { useEffect, useState } from 'react'

export function useDarkMode() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

    useEffect(() => {
        const root = window.document.documentElement
        theme === 'dark'
            ? root.classList.add('dark')
            : root.classList.remove('dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    return [theme, setTheme] as const
}
