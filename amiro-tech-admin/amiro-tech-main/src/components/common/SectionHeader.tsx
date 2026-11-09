import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type SectionHeaderProps = {
  align?: 'start' | 'center'
  className?: string
  description?: string
  eyebrow?: string
  title: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'title'>

export function SectionHeader({
  align = 'start',
  className,
  description,
  eyebrow,
  title,
  ...props
}: SectionHeaderProps) {
  const classes = [
    'section-header',
    align === 'center' ? 'section-header--center' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-header__title">{title}</h2>
      {description ? <p className="section-header__description">{description}</p> : null}
    </div>
  )
}
