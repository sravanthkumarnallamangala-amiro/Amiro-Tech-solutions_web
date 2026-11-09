import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonBaseProps = {
  children?: ReactNode
  className?: string
  size?: ButtonSize
  variant?: ButtonVariant
}

type ButtonAsButtonProps = ButtonBaseProps &
  ComponentPropsWithoutRef<'button'> & {
    href?: undefined
  }

type ButtonAsAnchorProps = ButtonBaseProps &
  ComponentPropsWithoutRef<'a'> & {
    href: string
  }

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps

export function Button({
  children,
  className,
  href,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes = [
    'button',
    `button--${variant}`,
    size !== 'md' ? `button--${size}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a className={classes} href={href} {...(props as ComponentPropsWithoutRef<'a'>)}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = props as ComponentPropsWithoutRef<'button'>

  return (
    <button className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  )
}
