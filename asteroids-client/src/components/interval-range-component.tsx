import { useState } from 'react'

interface Props {
  startDateInit: string
  endDateInit: string
  onSubmit: ({ startDate, endDate }: { startDate: string, endDate: string }) => void
}

export function IntervalRangeComponent ({
  startDateInit,
  endDateInit,
  onSubmit
}: Props) {
  const [startDate, setStartDate] = useState(() => {
    return startDateInit
  })
  const [endDate, setEndDate] = useState(() => {
    return endDateInit
  })

  return (
    <div>
      <label>
                Start date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => { setStartDate(e.target.value) }}
        />
      </label>
      <label>
                End date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => { setEndDate(e.target.value) }}
        />
      </label>
      <button
        className='retro-button'
        onClick={() => {
          onSubmit({ startDate, endDate })
        }}
      >
                Search
      </button>
    </div>
  )
}
