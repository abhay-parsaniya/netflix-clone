import React from 'react'

interface Props{
    children: React.ReactNode,
    className?: string,
    type?: 'submit' | 'button',
    onClick?: () => void
}
const Button = ({children, className, type, onClick}: Props) => {
  return (
    <button className={className} onClick={onClick} type={type}>
        {children}
    </button>
  )
}

// const defaultProps = {
//   className: '',
//   onClick: () => Promise<void>,
//   type: 'submit' || 'reset' || 'button' || 'undefined'
// }
export default Button