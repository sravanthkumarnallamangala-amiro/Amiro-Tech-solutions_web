import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type GridColumns = 1 | 2 | 3 | 4 | 'auto'
type GridGap = 'sm' | 'md' | 'lg'

type GridProps = {
  children?: ReactNode
  className?: string
  columns?: GridColumns
  gap?: GridGap
} & ComponentPropsWithoutRef<'div'>

export function Grid({
  children,
  className,
  columns = 'auto',
  gap = 'md',
  ...props
}: GridProps) {
  const classes = ['grid', `grid--${columns}`, `grid--${gap}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
