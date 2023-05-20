import { type ReactNode, createContext, useState, useContext } from 'react'

const datesContext = createContext<{
  initDate: string
  endDate: string
  setInitDate: (initDate: string) => void
  setEndDate: (endDate: string) => void
} | null>(null)

export const DatesProvider = ({ children }: {
  children: ReactNode
}) => {
  const [initDate, setInitDate] = useState('2015-09-07')
  const [endDate, setEndDate] = useState('2015-09-13')
  return (
        <datesContext.Provider value={{ initDate, endDate, setInitDate, setEndDate }}>
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
