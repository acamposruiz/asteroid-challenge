import { type ReactNode, createContext, useState, useContext } from 'react'

const datesContext = createContext<{
  date: { startDate: string, endDate: string }
  setDate: (date: { startDate: string, endDate: string }) => void
} | null>(null)

export const DatesProvider = ({ children }: {
  children: ReactNode
}) => {
  const [date, setDate] = useState({ startDate: '2015-09-07', endDate: '2015-09-13' })
  return (
    <datesContext.Provider value={{ date, setDate }}>
      {children}
    </datesContext.Provider>

  )
}

export const useDatesContext = () => {
  const context = useContext(datesContext)
  if (context == null) {
    throw new Error('useDatesContext must be used within a DatesProvider')
  }
  return context
}
