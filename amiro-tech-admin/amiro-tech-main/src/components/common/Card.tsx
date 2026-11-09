import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type CardPadding = 'compact' | 'standard' | 'spacious'

type CardProps<T extends ElementType = 'article'> = {
  as?: T
  children?: ReactNode
  className?: string
  interactive?: boolean
  padding?: CardPadding
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Card<T extends ElementType = 'article'>({
  as,
  children,
  className,
  interactive = false,
  padding = 'standard',
  ...props
}: CardProps<T>) {
  const Component = as ?? 'article'
  const classes = [
    'card',
    padding !== 'standard' ? `card--${padding}` : '',
    interactive ? 'card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
