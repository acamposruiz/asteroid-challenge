import cx from 'classnames'
import styles from './styles.module.css'
export function FavoriteButtonComponent ({
  isFavorite = false,
  isBig = false,
  onClick
}: {
  isFavorite?: boolean
  isBig?: boolean
  onClick: () => void
}) {
  const redHeart = <span>❤️</span>
  const greenHeart = <span>💚</span>

  return (
    <button className={ cx(styles.button, { [styles.big]: isBig }) } onClick={onClick}>
      {isFavorite ? redHeart : greenHeart}
    </button>
  )
}
