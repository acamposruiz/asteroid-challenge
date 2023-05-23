import cx from 'classnames'
import styles from './styles.module.css'
export function FavoriteButtonComponent ({
  isFavorite = false,
  isBig = false,
  onClick,
  enabled = true
}: {
  isFavorite?: boolean
  isBig?: boolean
  onClick: () => void
  enabled?: boolean
}) {
  const redHeart = <span>❤️</span>
  const greenHeart = <span>💚</span>
  const disabledHeart = <span>🤍</span>

  return (
    <button
      disabled={!enabled}
      className={cx(styles.button, { [styles.big]: isBig })}
      onClick={onClick}
    >
      {!enabled ? disabledHeart : isFavorite ? redHeart : greenHeart}
    </button>
  )
}
