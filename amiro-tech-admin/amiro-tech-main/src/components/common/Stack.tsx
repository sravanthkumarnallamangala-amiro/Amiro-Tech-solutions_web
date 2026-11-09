import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type StackProps<T extends ElementType = 'div'> = {
  as?: T
  children?: ReactNode
  className?: string
  gap?: StackGap
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Stack<T extends ElementType = 'div'>({
  as,
  children,
  className,
  gap = 'md',
  ...props
}: StackProps<T>) {
  const Component = as ?? 'div'
  const classes = ['stack', `stack--${gap}`, className].filter(Boolean).join(' ')

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
