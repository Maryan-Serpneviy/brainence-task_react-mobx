import React from 'react'
import styles from './Header.module.scss'

export default function Header() {
    const { header, logo } = styles
    return (
        <header className={header}>
            <div className={logo}>Pandemic Products</div>
        </header>
    )
}
