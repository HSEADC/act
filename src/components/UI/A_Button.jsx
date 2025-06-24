import React from 'react'
import IconSearch from './Q_Search.jsx'
import IconArrow from './Q_ArrowRight.jsx'

const iconMap = {
  search: IconSearch,
  arrow: IconArrow
}

export default function A_Button({
  variant = 'icon+text',
  iconType,
  label,
  onClick,
  link = false
}) {
  const Icon = iconType ? iconMap[iconType] : null

  const classNames = ['A_ButtonSmall', 'Search', link && 'Link']
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classNames} onClick={onClick}>
      {(variant === 'text' || variant === 'icon+text') && label && (
        <span className="A_Button__label">{label}</span>
      )}
      {(variant === 'icon' || variant === 'icon+text') && Icon && (
        <Icon className="A_Button__icon" />
      )}
    </button>
  )
}
