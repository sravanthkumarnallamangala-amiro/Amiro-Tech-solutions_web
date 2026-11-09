import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type ContainerSize = 'default' | 'narrow' | 'wide' | 'full'

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  children?: ReactNode
  className?: string
  size?: ContainerSize
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Container<T extends ElementType = 'div'>({
  as,
  children,
  className,
  size = 'default',
  ...props
}: ContainerProps<T>) {
  const Component = as ?? 'div'
  const classes = ['container', size !== 'default' ? `container--${size}` : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
