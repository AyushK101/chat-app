import React from 'react'

interface ContainerProp {
  children: React.ReactNode,
  className?: string
}

const Container = ({children, className}: ContainerProp) => {
  return (
    <div className={`max-w-screen-lg mx-auto ${className}`}>
      {children}
    </div>
  )
}

export default Container