'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-900 focus:ring-black',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-100 focus:ring-black',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white focus:ring-black',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

      return (
        <motion.button
          className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} button-3d button-glow relative overflow-hidden group`}
          whileHover={{ 
            y: -4,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          }}
          whileTap={{ y: -2, scale: 0.98 }}
          {...props}
        >
          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10">{children}</span>
        </motion.button>
      )
}

