'use client';
import React from 'react'
import styles from './page.module.css'

function Home() {
  return (
    <div className={styles.background}>
      <div>

      <h1 className={styles.title}>Welcome to Voting App!</h1>
      <p className={styles.description}>
        Register your vote <span onClick={()=> window.location="/vote"}> here</span>
      </p>
      </div>
    </div>
  )
}

export default Home