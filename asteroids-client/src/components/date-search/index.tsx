import { useState } from 'react'

interface DateSearchComponentProps {
  startDateInit: string
  endDateInit: string
  disabled?: boolean
  onSubmit: ({ startDate, endDate }: { startDate: string, endDate: string }) => void
}

export function DateSearch ({
  startDateInit,
  endDateInit,
  disabled = false,
  onSubmit
}: DateSearchComponentProps) {
  const [startDate, setStartDate] = useState(startDateInit)
  const [endDate, setEndDate] = useState(endDateInit)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ startDate, endDate })
  }

  return (
    <form
      onSubmit={submitHandler}
    >
      <label>
                Start date:
        <input
          type="date"
          value={startDate}
          disabled={disabled}
          onChange={(e) => { setStartDate(e.target.value) }}
        />
      </label>
      <label>
                End date:
        <input
          type="date"
          value={endDate}
          disabled={disabled}
          onChange={(e) => { setEndDate(e.target.value) }}
        />
      </label>
      <button
        className='retro-button'
        disabled={disabled}
      >
                Search
      </button>
    </form>
  )
}
