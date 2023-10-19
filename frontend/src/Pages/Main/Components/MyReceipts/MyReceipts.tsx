import {MutableRefObject, useEffect, useRef} from 'react'
import { getMyReceipts } from './API/getMyReceipts'
import { RootState } from '../../../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { setReceipts } from '../../../../store/slices/receiptsSlice'
import Receipt from '../Receipt/Receipt'

import styles from './MyReceipts.module.css'
import Meta from '../Meta/Meta'

export default function MyReceipts() {
    const receipts = useSelector((state: RootState) => state.receipts.value)
    const searchParams = useSelector((state: RootState) => state.receipts.searchParams)
    const dispatch = useDispatch()

    const myRef= useRef(null) as unknown as MutableRefObject<HTMLDivElement>

    useEffect(() => {
        getMyReceipts(searchParams).then((data)=>{
            dispatch(setReceipts(data))
        })
    }, [searchParams])

    useEffect(() => {
      setTimeout(()=> myRef.current?.scrollIntoView())
    }, [receipts])
    
    
    const handelerClick = () => {
      setTimeout(() => myRef.current.scrollIntoView())
    }

    

  return (
    <>
    <Meta handelerClick = {handelerClick} />
    <div className={styles.container}>
      
      {receipts.map((data, i) =><Receipt key={i} data={data} />)}
      <div ref={myRef}></div>  
      
      
    </div>
    
    </>
    
  ) 
}
