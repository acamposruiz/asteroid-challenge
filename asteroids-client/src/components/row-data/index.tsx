
import styles from './styles.module.css'

export const RowData = ({ title, value }: { title: string, value: string }) => (
  <p>
    <span className={styles.title}>{title}:</span> {value}
  </p>
)
