import { Link } from 'react-router-dom'

export function Minimal (
  { children }: { children: React.ReactNode }
) {
  return (
    <div>
      <Link to="/">Back to home</Link>
      {children}
    </div>
  )
}
