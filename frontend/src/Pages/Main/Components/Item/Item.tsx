import type { IItem } from "../../../../types/types";

import styles from './Item.module.css'

interface Data {
  data: IItem
}

export default function Item({data} :Data ) {
    const name = data.name
    const price = data.price
    const producttype = data.producttype.name
    const quantity = data.quantity

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
          <p><b>{name}</b></p>
          <p>{quantity} х {price} руб</p>
        </div>
        
        <p>Тип: {producttype}</p>
    </div>
  )
}
