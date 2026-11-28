import { useEffect, useState } from 'react'

export default function Enter({ fresh, reduced, delay = 0, children }) {
  const [open, setOpen] = useState(!fresh || reduced)

  useEffect(() => {
    if (!fresh || reduced) return undefined
    const id = window.setTimeout(() => setOpen(true), Math.round(delay * 1000))
    return () => window.clearTimeout(id)
  }, [fresh, reduced, delay])

  if (reduced || !fresh) return <div>{children}</div>

  return (
    <div className={`rise${open ? ' is-open' : ''}`}>
      <div className="rise-inner">{children}</div>
    </div>
  )
}
