import React, { useState } from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import { restoreState } from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getDayOfWeek(number: number) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return daysOfWeek[number]
}

function getTimeIn24HourFormat(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

function getDateInFormat(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  return `${day}.${month}.${year}`
}

function Clock() {
  const [timerId, setTimerId] = useState<number | undefined>(undefined)
  // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
  const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
  const [show, setShow] = useState<boolean>(false)

  const start = () => {
    // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
    // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)
    const id: number = window.setInterval(() => {
      setDate(new Date())
    }, 1000)

    setTimerId(id)
  }

  const stop = () => {
    // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
    clearInterval(timerId)
    setTimerId(undefined)
  }

  const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка
    setShow(true)
  }
  const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
    setShow(false)
  }

  const stringTime = getTimeIn24HourFormat(date) || <br /> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
  const stringDate = getDateInFormat(date) || <br /> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

  // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
  const stringDay = getDayOfWeek(date.getDay())
  const stringMonth = months[date.getMonth()] || <br /> // пишут студенты

  return (<div className={s.clock}>
    <div
      id={'hw9-watch'}
      className={s.watch}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span id={'hw9-day'}>{stringDay}</span>,{' '}
      <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
    </div>

    <div id={'hw9-more'}>
      <div className={s.more}>
        {show ? (<>
          <span id={'hw9-month'}>{stringMonth}</span>,{' '}
          <span id={'hw9-date'}>{stringDate}</span>
        </>) : (<>
          <br />
        </>)}
      </div>
    </div>

    <div className={s.buttonsContainer}>
      <SuperButton
        id={'hw9-button-start'}
        disabled={Boolean(timerId)} // пишут студенты // задизэйблить если таймер запущен
        onClick={start}
      >
        start
      </SuperButton>
      <SuperButton
        id={'hw9-button-stop'}
        disabled={Boolean(!timerId)} // пишут студенты // задизэйблить если таймер не запущен
        onClick={stop}
      >
        stop
      </SuperButton>
    </div>
  </div>)
}

export default Clock
