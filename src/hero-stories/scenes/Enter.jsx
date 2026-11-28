import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

export default function Enter({ fresh, reduced, children, distance = 8, duration = 0.22 }) {
  if (reduced || !fresh) return <div>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease }}
    >
      {children}
    </motion.div>
  )
}
