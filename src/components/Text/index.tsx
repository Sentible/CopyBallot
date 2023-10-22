import { theme } from '@/styles/theme/theme'
import Link from 'next/link'
import React from 'react'

type TextOverflow = 'wrap' | 'truncate' | 'no-wrap' | 'hidden'
type Headers = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type TextStyle =
  | Headers
  | 'body'
  | 'boldCaption'
  | 'caption'
  | 'headline'
  | 'label'
  | 'micro'
  | 'title'
type TextTag = Headers | 'p' | 'span' | 'label' | 'a' | 'link'

type Props = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  href?: string
  number?: boolean
  onClick?: (e: React.MouseEvent<any>) => void
  overflow?: TextOverflow
  tag?: TextTag
  target?: '_blank' | '_self'
  textStyle?: TextStyle
}

const fontWeight = {
  body: theme.Typography.weight.normal,
  boldCaption: theme.Typography.weight.semiBold,
  caption: theme.Typography.weight.normal,
  headline: theme.Typography.weight.bold,
  h1: theme.Typography.weight.bold,
  h2: theme.Typography.weight.bold,
  h3: theme.Typography.weight.semiBold,
  h4: theme.Typography.weight.semiBold,
  h5: theme.Typography.weight.semiBold,
  h6: theme.Typography.weight.normal,
  label: theme.Typography.weight.bold,
  micro: theme.Typography.weight.normal,
  title: theme.Typography.weight.bold
}

const fontSize = {
  body: theme.Typography.size.normal,
  boldCaption: theme.Typography.size.tiny,
  caption: theme.Typography.size.tiny,
  headline: theme.Typography.size.headline,
  h1: theme.Typography.size.xLarge,
  h2: theme.Typography.size.larger,
  h3: theme.Typography.size.large,
  h4: theme.Typography.size.normal,
  h5: theme.Typography.size.small,
  h6: theme.Typography.size.small,
  label: theme.Typography.size.normal,
  micro: theme.Typography.size.micro,
  title: theme.Typography.size.giant
}

const Text: React.FC<Props> = ({
  children,
  className,
  disabled = false,
  href,
  number,
  onClick,
  overflow = 'wrap',
  tag = 'p',
  target,
  textStyle = 'body'
}): JSX.Element => {
  const isLink = (tag as TextTag) === 'link'
  const Tag = isLink ? (Link as any) : tag
  const classNames = [
    `text--${textStyle}`,
    `text--${overflow}`,
    className,
    number && 'number'
  ]
    .join(' ')
    .trim()
  const _target = target ? target : href ? '_blank' : undefined

  const numberProps = {
    fontSize: theme.Typography.size.normal,
    fontWeight: theme.Typography.weight.semiBold
  } as React.CSSProperties

  const styleProps = {
    fontSize: fontSize[textStyle],
    fontWeight: fontWeight[textStyle],
    textOverflow: overflow,
    ...(number && numberProps)
  } as React.CSSProperties

  return (
    <Tag
      className={classNames}
      onClick={(e: any) => {
        if (!disabled) {
          tag === 'a' && e.stopPropagation()
          onClick && onClick(e)
        }
      }}
      {...(isLink ? { to: href, target: _target } : { href })}
      style={styleProps}
      target={_target}
    >
      {children}
    </Tag>
  )
}

export default Text
