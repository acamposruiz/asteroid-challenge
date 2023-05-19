import { useState } from 'react'

function useDates () {
  const [initDate, setInitDate] = useState('2021-08-01')
  const [endDate, setEndDate] = useState('2021-08-07')
  return { initDate, endDate, setInitDate, setEndDate }
}

export default useDates
