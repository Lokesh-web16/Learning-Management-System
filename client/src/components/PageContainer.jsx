import { motion } from 'framer-motion';

export default function PageContainer({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`max-w-7xl mx-auto px-4 sm:px-6 py-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}
