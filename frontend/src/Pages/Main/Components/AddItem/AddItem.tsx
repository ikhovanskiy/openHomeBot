import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem, updateItem } from '../../../../store/slices/receiptsSlice'


import styles from './AddItem.module.css'


import { BsFillPencilFill } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IItem } from '../../../../types/types';

interface Data {
    data: IItem,
    id: number
}


export default function AddItem({data, id}:Data) {
    const [itemData, setItemData] = useState(data)
    const [errorMessage, setErrorMessage] = useState('')
    const [status, setStatus] = useState(true)
    
    const dispatch = useDispatch()

    const updateData = () => {
        if(itemData.name.length < 1 
            || itemData.price < 1 
            || itemData.producttype.name.length < 1 
            || itemData.quantity < 1) {
            setErrorMessage('Не все заполнено')
            setTimeout(()=>setErrorMessage(''), 2000)
            return
        }
        dispatch(updateItem({
            id: id,
            value: itemData
        }))
        setStatus(false)
    }

  return status ? (
    <div className={styles.container}>
        <div className={styles.tickBar}>
            <div onClick={updateData}>
                <AiOutlineCheck />
            </div>
            <p>{errorMessage}</p>
            <div onClick={()=>dispatch(deleteItem(id))}>
                <AiOutlineClose />
            </div>
        </div>
        
        <input type="text" 
            name="name" 
            placeholder="Название" 
            onChange={(e)=>{setItemData({...itemData, name: e.target.value})}} value={itemData.name}/>
        
        <input type="text" 
            name="producttype" 
            placeholder="Тип" 
            onChange={(e)=>{setItemData({...itemData, producttype:{...itemData.producttype, name: e.target.value} })}} 
            value={itemData.producttype.name} />
        <div className={styles.priceContainer}>
            <input type="number" 
                name="price" placeholder="Цена" 
                onChange={(e)=>{setItemData({...itemData, price: +e.target.value})}} 
                value={itemData.price}/>
            <p>руб</p>
            <AiOutlinePlus onClick={()=>{setItemData({...itemData, quantity: itemData.quantity+1})}}/>
           
            <p>{itemData.quantity}</p>
            <AiOutlineMinus onClick={()=>{
                if(itemData.quantity <= 1) return
                setItemData({...itemData, quantity: itemData.quantity-1})}}/>
            
        </div>
           
    </div>
    
  ): (
    <div className={styles.container}>

        <div className={styles.tickBar}>
            <div onClick={()=> setStatus(true)}>
            <BsFillPencilFill />
            </div>
            <div onClick={()=>dispatch(deleteItem(id))}>
                <AiOutlineClose />
            </div>
        </div>
        <div className={styles.dataContainer}>
            <div className={styles.dataWrapper}>
                <p>{itemData.name}</p>
                <p>{itemData.quantity} х {itemData.price} руб</p>
            </div>
            <p>{itemData.producttype.name}</p>
        </div>
        
        
    </div>

  )
}
