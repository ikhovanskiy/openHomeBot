import MyReceipts from '../MyReceipts/MyReceipts'
import AddReceipts from '../AddReceipts/AddReceipts'

import styles from './Receipts.module.css'

export default function Receipts() {
  return (
    <section className={styles.container}>
        <AddReceipts />
        <MyReceipts />
    </section>
  )
}
