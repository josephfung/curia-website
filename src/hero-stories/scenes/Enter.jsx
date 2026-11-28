import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

export default function Enter({ fresh, reduced, children }) {
  if (reduced || !fresh) return <div>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      transition={{ duration: 0.55, ease }}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  )
}
