/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from "react"
import styles from './countDown.module.css'
import { IoCalendarOutline } from "react-icons/io5"

type CountDownComponent = {
  date: string,
  dateString: string,
  targetMessage: string
}

export default function CountDown ({ date, dateString, targetMessage }: CountDownComponent) {
  const [countDown, setCountDown] = useState('0d 0h 0m 0s')

  useEffect(() => {
    const targetDate = new Date(date).getTime()

    const intervalCountDown = setInterval(function() {
      const now = new Date().getTime()
      const distance = targetDate - now
    
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      
      setCountDown(`
        ${days}d : ${hours}h : ${minutes}m : ${seconds}s
      `)

      if (distance < 0) {
        clearInterval(intervalCountDown);
        setCountDown(targetMessage);
      }
    }, 1000)

    return () => {
      clearInterval(intervalCountDown)
    }
  }, [])

  return (
    <section className={styles['count-down']}>
      <span className={styles.date}>
        <IoCalendarOutline />
        {dateString}
      </span>
      <span className={styles.simple}>Faltan:</span>
      <span className={styles.count}>{countDown}</span>
    </section>
  )
}