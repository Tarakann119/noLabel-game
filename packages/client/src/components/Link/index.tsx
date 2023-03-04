import type { AnchorHTMLAttributes, FC } from 'react'
import { memo } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import classNames from 'classnames'
import '../Button/index.css'

export type LinkProps = {
  href: string
  text: string
  view?: 'primary' | 'secondary' | 'ghost'
} & AnchorHTMLAttributes<HTMLAnchorElement>

export const Link: FC<LinkProps> = memo(
  ({ href, text, view = 'primary', ...props }) => {
    return (
      <RouterLink
        className={classNames('button', `button_view_${view}`)}
        to={href}
        {...props}>
        {text}
      </RouterLink>
    )
  }
)
