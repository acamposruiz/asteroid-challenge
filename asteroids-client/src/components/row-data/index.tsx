import styles from './styles.module.css'

export const RowData = ({
  title,
  value
}: {
  title: string | undefined
  value: string | number | undefined
}) => (
  <p>
    <span className={styles.title}>{title}:</span> {value}
  </p>
)
