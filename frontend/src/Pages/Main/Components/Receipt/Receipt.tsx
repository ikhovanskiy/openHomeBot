
import Item from '../Item/Item'
import styles from './Receipt.module.css'

interface Data {
  data: {
    date_time: string,
    total_sum: number,
        retailplace: {
            name: string,
            address: string
        },
    items: Array<{
      id:string,
      name:string,
      price: number,
      quantity: number,
      producttype : {
          name: string
      }
      }>
  }
}
export default function Receipt({data}:Data) {
    const date_time = new Date(Date.parse(data.date_time))
    const total_sum = data.total_sum
    const items = data.items
    const retailplace = data.retailplace
  return (
    <div className={styles.container }>
        <div className={styles.metaWrapper }>
          <p>{date_time.getHours()}:{date_time.getMinutes()} {date_time.getDate()}-{date_time.getMonth()}-{date_time.getFullYear()}  </p>
          <p>"{retailplace.name}"  </p>
          <p>{retailplace.address}</p>
        </div>
        
        <p><b>Всего: {total_sum} руб</b></p>
        {items.map((el)=> <Item key={el.id} data={el}/>)}
        
    </div>
  )
}
