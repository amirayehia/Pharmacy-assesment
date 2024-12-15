import React from 'react'
type TitleProps = {
  title: string
}

export default function Title ({ title }: TitleProps) {
  return <p className='my-11 text-DEFAULT font-bold text-4xl'>{title}</p>
}
