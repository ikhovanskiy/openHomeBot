import {MutableRefObject, useEffect, useRef} from 'react'
import { getMyReceipts } from './API/getMyReceipts'
import { RootState } from '../../../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { setReceipts } from '../../../../store/slices/receiptsSlice'
import Receipt from '../Receipt/Receipt'

import { PiCaretDoubleUpBold } from 'react-icons/pi'

import styles from './MyReceipts.module.css'

export default function MyReceipts() {
    const receipts = useSelector((state: RootState) => state.receipts.value)
    const dispatch = useDispatch()

    const myRef= useRef(null) as unknown as MutableRefObject<HTMLDivElement>

    useEffect(() => {
        getMyReceipts().then((data)=>{
            dispatch(setReceipts(data))
        })
    }, [])
    useEffect(() => {
      setTimeout(()=> myRef.current?.scrollIntoView())
  }, [receipts])
    
    

  return receipts.length > 0 ?(
    <div className={styles.container}>
      
      {receipts.map((data, i) =><Receipt key={i} data={data} />)}
      <div ref={myRef}></div>   
      <button 
        onClick={()=>setTimeout(() => myRef.current.scrollIntoView())}
        className={styles.upBtn} >
              <PiCaretDoubleUpBold />
      </button> 
    </div>
    
  ) : (<div></div>)
}
