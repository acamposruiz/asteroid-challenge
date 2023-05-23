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
  const redHeart = <span>❤️</span>
  const greenHeart = <span>💚</span>
  const disabledHeart = <span>🤍</span>

  return (
    <button
      disabled={disabled}
      className={cx(styles.button, { [styles.big]: size === FavoriteButtonSize.Big })}
      onClick={onClick}
    >
      {disabled ? disabledHeart : isFavorite ? redHeart : greenHeart}
    </button>
  )
}
