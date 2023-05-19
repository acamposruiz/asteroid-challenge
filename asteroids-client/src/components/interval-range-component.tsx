
interface Props {
  initDate: string
  endDate: string
  onInitDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
}

export function IntervalRangeComponent ({
  initDate,
  endDate,
  onInitDateChange,
  onEndDateChange
}: Props) {
  return (
        <div>
            <label>
                Start date:
                <input
                    type="date"
                    value={initDate}
                    onChange={(e) => { onInitDateChange(e.target.value) }}
                />
            </label>
            <label>
                End date:
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => { onEndDateChange(e.target.value) }}
                />
            </label>
        </div>
  )
}
