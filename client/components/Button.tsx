import React from 'react'

interface Props {
  type: string
  onClick: (event: React.MouseEvent) => void
  children: React.ReactNode
  buttonType?: 'submit' | 'button'
}

export function Button({ buttonType, type, onClick, children }: Props) {
  let color = ''
  switch (type) {
    case 'red':
      color = 'bg-red hover:mix-blend-luminosity'
      break
    case 'green':
      color = 'bg-green hover:mix-blend-luminosity'
      break
    case 'hover-red':
      color = 'hover:bg-red bg-secondary'
      break
    case 'hover-green':
      color = 'hover:bg-green bg-secondary'
      break
    default:
      color = 'bg-secondary hover:mix-blend-luminosity hover:bg-green'
  }

  return (
    <button
      onClick={onClick}
      className={`inline-block rounded px-6 pb-1.5 pt-2 text-sm font-medium uppercase leading-normal text-white  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out ${color} hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mb-0 md:mr-2`}
      type={buttonType ? buttonType : undefined}
    >
      {children}
    </button>
  )
}
