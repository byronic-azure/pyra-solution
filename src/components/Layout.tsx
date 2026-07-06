import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0D1117]">
      <Navbar />
      <main className="flex-1 pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
