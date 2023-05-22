import cx from 'classnames'
import styles from './styles.module.css'

export const RowData = ({
  title,
  value,
  isWarning = false
}: {
  title: string | undefined
  value: string | number | undefined
  isWarning?: boolean
}) => (
  <p>
    <span className={styles.title}>{title}:</span>{' '}
    <span className={cx({ [styles.warning]: isWarning })}>
      {value}
    </span>
  </p>
)
