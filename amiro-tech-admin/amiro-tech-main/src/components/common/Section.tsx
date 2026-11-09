import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type SectionSpacing = 'standard' | 'compact' | 'spacious'
type SectionTone = 'default' | 'soft' | 'dark'

type SectionProps = {
  children?: ReactNode
  className?: string
  spacing?: SectionSpacing
  tone?: SectionTone
} & ComponentPropsWithoutRef<'section'>

export function Section({
  children,
  className,
  spacing = 'standard',
  tone = 'default',
  ...props
}: SectionProps) {
  const classes = [
    'section',
    spacing !== 'standard' ? `section--${spacing}` : '',
    tone !== 'default' ? `section--${tone}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  )
}
