import cx from 'classnames'
import styles from './styles.module.css'

export const enum FavoriteButtonSize {
  Small,
  Big
}

interface FavoriteButtonComponentProps {
  isFavorite?: boolean
  size?: FavoriteButtonSize
  onClick: () => void
  disabled?: boolean
}

export function FavoriteButtonComponent ({
  isFavorite = false,
  size = FavoriteButtonSize.Small,
  onClick,
  disabled = false
}: FavoriteButtonComponentProps) {
  const onFavoriteIcon = <span>❤️</span>
  const offFavoriteIcon = <span>💚</span>
  const disabledIcon = <span>🤍</span>

  return (
    <button
      disabled={disabled}
      className={cx(styles.button, { [styles.big]: size === FavoriteButtonSize.Big })}
      onClick={onClick}
    >
      {disabled ? disabledIcon : isFavorite ? onFavoriteIcon : offFavoriteIcon}
    </button>
  )
}
